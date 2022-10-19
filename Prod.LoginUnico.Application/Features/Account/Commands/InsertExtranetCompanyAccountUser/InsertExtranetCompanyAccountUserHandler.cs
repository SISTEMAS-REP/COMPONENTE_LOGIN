using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccountUser;

public class InsertExtranetCompanyAccountUserHandler
    : IRequestHandler<InsertExtranetCompanyAccountUserCommand>
{
    private readonly IDefaultRoleUnitOfWork _defaultRoleUnitOfWork;
    private readonly IExtranetUserRoleUnitOfWork _extranetUserRoleUnitOfWork;
    private readonly IPersonasServicio _personasServicio;
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly ICurrentUserService _currentUserService;
    private readonly AppSettings _options;
    private readonly IEmailService _emailService;

    public InsertExtranetCompanyAccountUserHandler(
        IDefaultRoleUnitOfWork defaultRoleUnitOfWork,
        IExtranetUserRoleUnitOfWork extranetUserRoleUnitOfWork,
        IPersonasServicio personasServicio,
        IExtranetUserManager extranetUserManager,
        ICurrentUserService currentUserService,
        IOptions<AppSettings> options,
        IEmailService emailService)
    {
        _defaultRoleUnitOfWork = defaultRoleUnitOfWork;
        _extranetUserRoleUnitOfWork = extranetUserRoleUnitOfWork;
        _personasServicio = personasServicio;
        _extranetUserManager = extranetUserManager;
        _currentUserService = currentUserService;
        _options = options.Value;
        _emailService = emailService;
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
        var role = await _defaultRoleUnitOfWork
            .FindExtranet(new());

        var applicationRole = role
            .Where(x => x.id_aplicacion == request.ApplicationId)
            .FirstOrDefault();

        if (applicationRole is null)
        {
            throw new BadRequestException("No puede registrarse en esta aplicación.");
        }

        // Definir el user_name basado en el tipo de persona
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
                    id_rol = applicationRole.id_rol,
                    id_aplicacion = applicationRole.id_aplicacion,
                });

            if (userRoles.Count() > 0)
            {
                throw new BadRequestException("Usted ya se encuentra registrado " +
                    "en la aplicación");
            }

            // Registrar la aplicación al usuario existente
            await _extranetUserRoleUnitOfWork
                .InsertExtranetUserRole(new()
                {
                    id_usuario_extranet = user.id_usuario_extranet,
                    id_rol = applicationRole.id_rol
                });

            // Actualizar la contraseña del usuario existente
            var passwordResult = await _extranetUserManager
                .AddPasswordAsync(user, request.Password!);

            if (!passwordResult)
            {
                throw new ApiException("Ocurrió un problema para actualizar su información. " +
                    "Inténtelo nuevamente.");
            }
        }
        else
        {
            // Actualizar la información de la persona
            var updateResponse = _personasServicio
            .ActualizarPersonaById(new()
            {
                id = request.PersonId,
                id_sector = request.SectorId,
                id_tipo_persona = request.PersonType,

                email = request.Email!,
                celular = request.PhoneNumber!,

                usuario = _options?.UserAudit?.UserName!,
                usuario_mod = _options?.UserAudit?.UserName!,
                fecha_mod = operationDateTime
            });

            if (updateResponse is null
            || !updateResponse.Success
            || StringToInt(updateResponse.Value) <= 0)
            {
                throw new ApiException("Ocurrió un problema durante el proceso de registro. " +
                    "Inténtelo nuevamente.");
            }

            // Registrar usuario
            var result = await _extranetUserManager
                .CreateAsync(
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

            // Buscar usuario registrado recientemente
            var userInserted = await _extranetUserManager
                .FindByNameAsync(userName!);

            // Registrar la aplicación al usuario registrado recientemente
            await _extranetUserRoleUnitOfWork
                .InsertExtranetUserRole(new()
                {
                    id_usuario_extranet = userInserted.id_usuario_extranet,
                    id_rol = applicationRole.id_rol
                });
        }

        await _emailService.CreatePersonAccount(request.Email!,
            userName,
            request.Password!);

        return Unit.Value;
    }

    private static int StringToInt(string? stringValue)
    {
        return int.TryParse(stringValue, out int intValue)
            ? intValue
            : default;
    }
}