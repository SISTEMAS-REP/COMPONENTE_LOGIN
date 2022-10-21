using MediatR;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Wrappers;
using Prod.LoginUnico.Application.Common.Exceptions;

namespace Prod.LoginUnico.Application.Features.Account.Commands.ValidateCurrentPassword;

public class ValidateCurrentPasswordHandler 
    : IRequestHandler<ValidateCurrentPasswordCommand, Response<Unit>>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IExtranetUserManager _extranetUserManager;

    public ValidateCurrentPasswordHandler(ICurrentUserService currentUserService, 
        IExtranetUserManager extranetUserManager)
    {
        _currentUserService = currentUserService;
        _extranetUserManager = extranetUserManager;
    }

    public async Task<Response<Unit>>
    Handle(ValidateCurrentPasswordCommand request,
           CancellationToken cancellationToken)
    {
        var userId = _currentUserService.User?.UserId;

        if (string.IsNullOrEmpty(userId))
        {
            throw new ForbiddenAccessException("Authentication user not found.");
        }

        var user = await _extranetUserManager
            .FindByIdAsync(userId);

        var result = await _extranetUserManager
            .CheckPasswordAsync(user, request.password);

        return new()
        {
            Succeeded = result
        };
    }
}
