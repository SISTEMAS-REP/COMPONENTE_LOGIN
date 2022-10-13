using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Models.Services;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccount;

public class InsertExtranetCompanyAccountHandler
    : IRequestHandler<InsertExtranetCompanyAccountCommand>
{
    private readonly IRoleUnitOfWork _roleUnitOfWork;
    private readonly IExtranetUserRoleUnitOfWork _extranetUserRoleUnitOfWork;
    private readonly IPersonasService _personsService;
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly IReCaptchaService _reCaptchaService;

    private readonly AppSettings _options;

    public InsertExtranetCompanyAccountHandler(
        IRoleUnitOfWork roleUnitOfWork,
        IExtranetUserRoleUnitOfWork extranetUserRoleUnitOfWork,
        IPersonasService personsService,
        IExtranetUserManager extranetUserManager,
        IReCaptchaService reCaptchaService,
        IOptions<AppSettings> options)
    {
        _roleUnitOfWork = roleUnitOfWork;
        _extranetUserRoleUnitOfWork = extranetUserRoleUnitOfWork;
        _personsService = personsService;
        _extranetUserManager = extranetUserManager;
        _reCaptchaService = reCaptchaService;
        _options = options.Value;
    }

    public async Task<Unit>
        Handle(InsertExtranetCompanyAccountCommand request,
               CancellationToken cancellationToken)
    {
        // Fecha y hora en la que se realiza la transacción
        var operationDateTime = DateTime.Now;

        var recaptchaResult = await _reCaptchaService.Validate(request.RecaptchaToken!);

        if (!recaptchaResult.Success)
        {
            var errors = recaptchaResult.ErrorCodes?
                .Select(e => e)
                .Aggregate((i, j) => i + ", " + j);
            throw new BadRequestException($"ReCaptcha validation failed: {errors}");
        }

        // Validar hay roles activos para registrarse en la aplicación
        var applicationRole = (await _roleUnitOfWork
            .FindRoles(new()
            {
                id_aplicacion = request.ApplicationId,
                nombre = "Administrado"
            }))
            .FirstOrDefault();

        if (applicationRole is null)
        {
            throw new BadRequestException("No puede registrarse en esta aplicación");
        }

        // Definir el user_name basado en el tipo de persona
        var userName = $"{request.RucNumber}{request.DocumentNumber}";

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

            //var newPassword = _passwordHasher.HashPassword(user, request.Contrasena);
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
            var legalRequest = new PersonasServiceRequest()
            {
                id = request.JuridicalPersonId,
                id_sector = request.SectorId,
                id_tipo_persona = request.PersonType,

                email = request.Email!,
                celular = request.PhoneNumber!,

                usuario = _options?.UserAudit?.UserName!,
                usuario_mod = _options?.UserAudit?.UserName!,
                fecha_mod = operationDateTime
            };

            var juridicalPersonId = await _personsService
                .UpsertLegalPerson(legalRequest);
            if (juridicalPersonId == 0)
            {
                throw new ApiException("No se puede actualizar" +
                    " la información de la persona jurídica.");
            }

            // Registrar usuario
            var result = await _extranetUserManager.CreateAsync(
                user: new()
                {
                    id_persona_natural = request.NaturalPersonId,
                    id_persona_juridica = request.JuridicalPersonId,

                    idsector = request.SectorId,

                    user_name = userName!,
                    email = request.Email!,
                    email_confirmed = true,
                    phone_number = request.PhoneNumber,
                    phone_number_confirmed = !string.IsNullOrEmpty(request.PhoneNumber),
                    //lockout_enable = true,

                    usuario_registro = _options?.UserAudit?.UserName!,
                    fecha_registro = operationDateTime,
                    usuario_modificacion = _options?.UserAudit?.UserName!,
                    fecha_modificacion = operationDateTime,
                    Activo = true
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