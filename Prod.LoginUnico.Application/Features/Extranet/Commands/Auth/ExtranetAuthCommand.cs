using MediatR;
using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrapper;
using static System.Net.Mime.MediaTypeNames;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;

public class ExtranetAuthCommand : IRequest<Response<ExtranetAuthResponse>>
{
    public int? PersonType { get; set; }

    public string? RucNumber { get; set; }

    public string? DocumentNumber { get; set; }

    public string? Password { get; set; }

    public bool? RememberMe { get; set; }

    public string? ReturnUrl { get; set; }

    public int ApplicationId { get; set; }
}

public class ExtranetAuthCommandHandler
    : IRequestHandler<ExtranetAuthCommand, Response<ExtranetAuthResponse>>
{
    //private readonly IAuthManager _manager;
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly IExtranetSignInManager _extranetSignInManager;
    private readonly IApplicationUnitOfWork _applicationUnitOfWork;

    public ExtranetAuthCommandHandler(
        IExtranetUserManager extranetUserManager,
        IExtranetSignInManager extranetSignInManager,
        IApplicationUnitOfWork applicationUnitOfWork)
    {
        _extranetUserManager = extranetUserManager;
        _extranetSignInManager = extranetSignInManager;
        _applicationUnitOfWork = applicationUnitOfWork;
    }

    public async Task<Response<ExtranetAuthResponse>>
        Handle(ExtranetAuthCommand request, CancellationToken cancellationToken)
    {
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

        var apps = await _applicationUnitOfWork.FindAppsByUserName(userName, request.ApplicationId);

        if (apps.Count() <= 0)
        {
            throw new UnauthorizedAccessException("El usuario no tiene permisos a la aplicacion");
        }

        await _extranetSignInManager
            .LogIn(user, request.Password!, request.RememberMe ?? false);
                
        return new()
        {
            Succeeded = true,
            Data = new()
            {
                ReturnUrl = request.ReturnUrl!
            }
        };
    }
}