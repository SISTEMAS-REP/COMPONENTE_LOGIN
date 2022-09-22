using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrapper;

namespace Prod.LoginUnico.Application.Features.External.Commands.Auth;

public class ExternalAuthCommand : IRequest<Response<ExternalAuthResponse>>
{
    public int? PersonType { get; set; }

    public string? RucNumber { get; set; }

    public string? DocumentNumber { get; set; }

    public string? Password { get; set; }

    public bool? RememberMe { get; set; }

    public string? ReturnUrl { get; set; }
}

public class ExternalAuthCommandHandler
    : IRequestHandler<ExternalAuthCommand, Response<ExternalAuthResponse>>
{
    private readonly IAuthManager _manager;

    public ExternalAuthCommandHandler(IAuthManager manager)
    {
        _manager = manager;
    }

    public async Task<Response<ExternalAuthResponse>>
        Handle(ExternalAuthCommand request, CancellationToken cancellationToken)
    {
        var result = await _manager.LogIn(
            request.DocumentNumber!,
            request.Password!,
            request.RememberMe ?? false);

        if (!result)
        {
            throw new ArgumentException("Ocurrió un problema durante el proceso de inicio de sesión.");
        }

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