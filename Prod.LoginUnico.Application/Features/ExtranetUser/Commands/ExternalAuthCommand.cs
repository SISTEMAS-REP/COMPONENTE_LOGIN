using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Models;

namespace Prod.LoginUnico.Application.Features.ExtranetUser.Commands;

public class ExternalAuthCommand : IRequest<Response<Token>>
{
    public string? username { get; set; }
    public string? password { get; set; }
}

public class AuthCommandHandler : IRequestHandler<ExternalAuthCommand, Response<Token>>
{
    private readonly IAuthManager _manager;

    public AuthCommandHandler(IAuthManager manager)
    {
        _manager = manager;
    }

    public async Task<Response<Token>> Handle(ExternalAuthCommand request, CancellationToken cancellationToken)
    {
        var token = await _manager.LogIn(
            username: request.username,
            password: request.password);

        return new()
        {
            Succeeded = true,
            Data = token
        };
    }
}