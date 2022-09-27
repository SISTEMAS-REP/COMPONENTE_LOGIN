using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;

public class ExtranetRegisterCommandHandler
    : IRequestHandler<ExtranetRegisterCommand>
{
    private readonly IRoleUnitOfWork _roleUnitOfWork;
    private readonly IExtranetUserRoleUnitOfWork _extranetUserRoleUnitOfWork;
    private readonly IPersonsService _personsService;
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IReCaptchaService _reCaptchaService;

    private readonly AppSettings _options;

    public ExtranetRegisterCommandHandler(
        IRoleUnitOfWork roleUnitOfWork,
        IExtranetUserRoleUnitOfWork extranetUserRoleUnitOfWork,
        IPersonsService personsService,
        IExtranetUserManager extranetUserManager,
        IPasswordHasher passwordHasher,
        IReCaptchaService reCaptchaService,
        IOptions<AppSettings> options)
    {
        _roleUnitOfWork = roleUnitOfWork;
        _extranetUserRoleUnitOfWork = extranetUserRoleUnitOfWork;
        _personsService = personsService;
        _extranetUserManager = extranetUserManager;
        _passwordHasher = passwordHasher;
        _reCaptchaService = reCaptchaService;
        _options = options.Value;
    }

    public async Task<Unit>
        Handle(ExtranetRegisterCommand request, CancellationToken cancellationToken)
    {
        var recaptchaResult = await _reCaptchaService.Validate(request.recaptchaToken);

        if (!recaptchaResult.Success)
        {
            var errors = recaptchaResult.ErrorCodes
                .Select(e => e)
                .Aggregate((i, j) => i + ", " + j);
            throw new BadRequestException($"ReCaptcha validation failed: {errors}");
        }

        // Validar hay roles activos para registrarse en la aplicación
        var applicationRole = (await _roleUnitOfWork
            .FindRoles(new() {
                id_aplicacion = request.applicationId ?? 0
            }))
            .FirstOrDefault();

        if (applicationRole is null)
        {
            throw new BadRequestException("No puede registrarse en esta aplicación");
        }

        // Definir el user_name basado en el tipo de persona
        var userName = request.documentNumber;
        if (request.personType == 2)
        {
            userName = $"{request.rucNumber}{userName}";
        }

        // Verificar si el usuario ya se encuentra registrado en la aplicación
        var user = await _extranetUserManager
            .FindByNameAsync(userName);        
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
                .AddPasswordAsync(user, request.password);

            if (!passwordResult)
            {
                throw new ApiException();
            }
        } 
        else
        {
            /*
             * Insertar o actualizar la información de la persona
             * - El servicio devolverá el ID de [DB_GENERAL].[dbo].[PERSONA]
             * - El ID puede ser de una persona natural o jurídica 
             *   (el servicio realiza esta evaluación basado en el request enviado)
             */
            var personId = await _personsService
                .InsertOrUpdatePerson(request, _options.UserAudit);
            if (personId == 0)
            {
                throw new ApiException("No se puede " +
                    (request.personId > 0 ? "actualizar" : "registrar") +
                    $" la información de la persona.");
            }

            /*
             * Definir si el ID obtenido en el servicio anterior
             * es id_persona_natural o id_persona_juridica
             */
            var legalPersonId = 0;
            var naturalPersonId = 0;
            if (request.personType == 2)
            {
                legalPersonId = personId;
                // TODO: SERVICIO PARA OBTENER EL ID_PERSONA_NATURAL
                // naturalPersonId = ;
            }
            else
            {
                naturalPersonId = personId;
            }

            // Registrar usuario
            var result = await _extranetUserManager.CreateAsync(
                user: new()
                {
                    id_persona_natural = naturalPersonId,
                    id_persona_juridica = legalPersonId,

                    user_name = userName,
                    email = request.email,
                    email_confirmed = true,
                    phone_number = request.phoneNumber,
                    phone_number_confirmed = !string.IsNullOrEmpty(request.phoneNumber),
                    //lockout_enable = true,
                    usuario_registro = _options.UserAudit.UserName,
                    fecha_registro = DateTime.Now,
                    //usuario_modificacion = _options.UserAudit.UserName,
                    Activo = true
                },
                password: "");

            if (result.errors is not null)
            {
                throw new BadRequestException(result.errors);
            }
        }

        // TODO: ENVIAR EMAIL

        return Unit.Value;
    }
}