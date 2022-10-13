using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Models.Services;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccountUser;

public class InsertExtranetCompanyAccountUserHandler
    : IRequestHandler<InsertExtranetCompanyAccountUserCommand>
{
    private readonly IRoleUnitOfWork _roleUnitOfWork;
    private readonly IExtranetUserRoleUnitOfWork _extranetUserRoleUnitOfWork;
    private readonly IPersonasService _personsService;
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly ICurrentUserService _currentUserService;

    private readonly AppSettings _options;

    public InsertExtranetCompanyAccountUserHandler(
        IRoleUnitOfWork roleUnitOfWork,
        IExtranetUserRoleUnitOfWork extranetUserRoleUnitOfWork,
        IPersonasService personsService,
        IExtranetUserManager extranetUserManager,
        ICurrentUserService currentUserService,
        IOptions<AppSettings> options)
    {
        _roleUnitOfWork = roleUnitOfWork;
        _extranetUserRoleUnitOfWork = extranetUserRoleUnitOfWork;
        _personsService = personsService;
        _extranetUserManager = extranetUserManager;
        _currentUserService = currentUserService;
        _options = options.Value;
    }

    public async Task<Unit>
        Handle(InsertExtranetCompanyAccountUserCommand request,
               CancellationToken cancellationToken)
    {
        var userId = _currentUserService.User?.UserId;
        if (string.IsNullOrEmpty(userId))
        {
            throw new ForbiddenAccessException("Authentication user not found.");
        }

        // Fecha y hora en la que se realiza la transacción
        var operationDateTime = DateTime.Now;

        // Validar hay roles activos para registrarse en la aplicación
        var role = (await _roleUnitOfWork
            .FindRoles(new()
            {
                id_aplicacion = request.ApplicationId,
                nombre = "Administrado"
            }))
            .FirstOrDefault();

        if (role is null)
        {
            throw new BadRequestException("No puede registrarse en esta aplicación");
        }

        // Definir el user_name basado en el tipo de persona
        // y lo digitado en el formulario
        var userName = $"{request.DocumentNumber}";

        // Verificar si el usuario ya se encuentra registrado en la base de datos
        var user = await _extranetUserManager
            .FindByNameAsync(userName!);
        if (user is not null)
        {
            // Validar si el usuario ya está registrado en la aplicación
            var userRoles = await _extranetUserRoleUnitOfWork
                .FindExtranetUserRoles(new()
                {
                    id_usuario_extranet = user.id_usuario_extranet,
                    id_rol = role.id_rol,
                    id_aplicacion = role.id_aplicacion,
                });

            if (userRoles.Count() > 0)
            {
                throw new BadRequestException("Ya existe una cuenta asociada al N° de documento.");
                /*throw new BadRequestException("Usted ya se encuentra registrado " +
                    "en la aplicación");*/
            }

            var resultId = await _extranetUserRoleUnitOfWork
                .InsertExtranetUserRole(new()
                {
                    id_usuario_extranet = user.id_usuario_extranet,
                    id_rol = role.id_rol
                });

            if (resultId <= 0)
            {
                throw new BadRequestException("No puede registrarse en esta aplicación");
            }

            /*var newPassword = _passwordHasher
                .HashPassword(user, request.Password!);*/
            var passwordResult = await _extranetUserManager
                .AddPasswordAsync(user, request.Password!);

            if (!passwordResult)
            {
                throw new ApiException();
            }
        }
        else
        {
            // Actualizar la información de la persona
            var naturalRequest = new PersonasServiceRequest()
            {
                id = request.PersonId,
                id_sector = request.SectorId,
                id_tipo_persona = request.PersonType,

                email = request.Email!,
                celular = request.PhoneNumber!,

                usuario = _options?.UserAudit?.UserName!,
                usuario_mod = _options?.UserAudit?.UserName!,
                fecha_mod = operationDateTime
            };

            var naturalPersonId = await _personsService
                .UpsertNaturalPerson(naturalRequest);
            if (naturalPersonId == 0)
            {
                throw new ApiException("No se puede actualizar" +
                    " la información de la persona natural.");
            }

            // Registrar usuario
            var result = await _extranetUserManager.CreateAsync(
                user: new()
                {
                    id_persona_natural = request.PersonId,
                    id_persona_juridica = 0,

                    user_name = userName!,
                    email = request.Email!,
                    email_confirmed = true,
                    phone_number = request.PhoneNumber,
                    phone_number_confirmed = !string.IsNullOrEmpty(request.PhoneNumber),

                    usuario_registro = _options?.UserAudit?.UserName!,
                    fecha_registro = operationDateTime,
                    usuario_modificacion = _options?.UserAudit?.UserName!,
                    fecha_modificacion = operationDateTime,
                    Activo = true,

                    id_contacto_extranet = int.Parse(userId)
                },
                password: request.Password!);

            if (result.errors is not null)
            {
                throw new BadRequestException(result.errors);
            }
        }

        return Unit.Value;
    }
}