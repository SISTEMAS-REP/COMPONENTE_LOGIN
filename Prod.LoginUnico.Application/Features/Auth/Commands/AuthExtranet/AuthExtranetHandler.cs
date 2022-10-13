using MediatR;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using System.Net;

namespace Prod.LoginUnico.Application.Features.Auth.Commands.AuthExtranet;

public class AuthExtranetHandler
    : IRequestHandler<AuthExtranetCommand>
{
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly IExtranetSignInManager _extranetSignInManager;
    private readonly IApplicationUnitOfWork _applicationUnitOfWork;
    private readonly IReCaptchaService _reCaptchaService;

    public AuthExtranetHandler(
        IExtranetUserManager extranetUserManager,
        IExtranetSignInManager extranetSignInManager,
        IApplicationUnitOfWork applicationUnitOfWork,
        IReCaptchaService reCaptchaService)
    {
        _extranetUserManager = extranetUserManager;
        _extranetSignInManager = extranetSignInManager;
        _applicationUnitOfWork = applicationUnitOfWork;
        _reCaptchaService = reCaptchaService;
    }

    public async Task<Unit>
        Handle(AuthExtranetCommand request, CancellationToken cancellationToken)
    {
        /*var recaptchaResult = await _reCaptchaService.Validate(request.RecaptchaToken!);

        if (!recaptchaResult.Success)
        {
            var errors = recaptchaResult.ErrorCodes!
                .Select(e => e)
                .Aggregate((i, j) => i + ", " + j);

            throw new UnauthorizedAccessException($"ReCaptcha validation failed: {errors}");
        }*/

        var userName = request.DocumentNumber!;

        if (request.PersonType == 2)
        {
            userName = $"{request.RucNumber!}{userName}";
        }

        var user = await _extranetUserManager
            .FindByNameAsync(userName);

        if (user is null)
        {
            throw new UnauthorizedAccessException("Usuario incorrecto.");
        }

        var apps = await _applicationUnitOfWork
            .FindAppsByUserName(userName, request.ApplicationId);

        if (apps.Count() <= 0)
        {
            throw new UnauthorizedAccessException("El usuario no tiene permisos a la aplicacion");
        }

        await _extranetSignInManager
            .LogIn(user, request.Password!, request.RememberMe ?? false);

        string localIP = "";
        IPHostEntry host = Dns.GetHostEntry(Dns.GetHostName());// objeto para guardar la ip 
        foreach (IPAddress ip in host.AddressList)
        {
            if (ip.AddressFamily.ToString() == "InterNetwork")
            {
                localIP = ip.ToString();// esta es nuestra ip
            }
        }

        await _applicationUnitOfWork
            .RegistrationLogSessionExtranet(true,
            DateTime.Now,
            user.id_usuario_extranet,
            localIP, "LoginUnico",
            host.HostName,
            true);

        return Unit.Value;
    }
}