using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Abstractions.Services;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery;

public class PasswordRecoveryHandlerV2
    : IRequestHandler<PasswordRecoveryCommand>
{
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly IApplicationUnitOfWork _applicationUnitOfWork;
    private readonly AppSettings _appSettings;
    private readonly IEmailService _emailService;

    public PasswordRecoveryHandlerV2(IExtranetUserManager extranetUserManager, 
        IApplicationUnitOfWork applicationUnitOfWork,
        IOptions<AppSettings> options,
        IEmailService emailService)
    {
        _extranetUserManager = extranetUserManager;
        _applicationUnitOfWork = applicationUnitOfWork;
        _appSettings = options.Value;
        _emailService = emailService;
    }

    public async Task<Unit>
    Handle(PasswordRecoveryCommand request, CancellationToken cancellationToken)
    {
        var userName = request.personType == 1 
            ? request.documentNumber!
            : request.rucNumber! + request.documentNumber!;

        string? urlBase = request.personType == 1 
            ? _appSettings.Urls?.Url_cambiar_password_persona
            : _appSettings.Urls?.Url_cambiar_password_empresa;

        urlBase = $"{urlBase}[{userName}]";

        var user = await _extranetUserManager
            .FindByNameAsync(userName);

        if (user is null)
        {
            throw new UnauthorizedAccessException("Usuario incorrecto.");
        }

        if (request.personType == 1 
            && request.email!.ToLower() != user.email.ToLower())
        {
            throw new UnauthorizedAccessException("El correo ingresado no coincide con " +
                "el correo registrado al usuario.");
        }

        var guid = Guid.NewGuid();
        await _applicationUnitOfWork
            .SP_INS_UPD_VERIFICACION_RECUPERACION_PASSWORD(guid, user.email.ToLower(), false);

        await _emailService
            .PasswordRecovery(request.email!, 
            urlBase, 
            request.applicationId, 
            userName, 
            guid, 
            request.returnUrl!);

        return Unit.Value;
    }
}