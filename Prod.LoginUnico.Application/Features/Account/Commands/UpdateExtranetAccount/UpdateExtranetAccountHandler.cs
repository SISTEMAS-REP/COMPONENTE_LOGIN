using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Common.Exceptions;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetAccountHandler
    : IRequestHandler<UpdateExtranetAccountCommand>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IExtranetUserManager _extranetUserManager;

    public UpdateExtranetAccountHandler(ICurrentUserService currentUserService,
        IExtranetUserManager extranetUserManager)
    {
        _currentUserService = currentUserService;
        _extranetUserManager = extranetUserManager;
    }

    public async Task<Unit>
        Handle(UpdateExtranetAccountCommand request,
               CancellationToken cancellationToken)
    {
        var userId = _currentUserService.User?.UserId;
        if (string.IsNullOrEmpty(userId))
        {
            throw new ForbiddenAccessException("Authentication user not found.");
        }

        var user = await _extranetUserManager.FindByIdAsync(userId);

        if (user is null)
        {
            throw new BadRequestException("User not found.");
        }

        user.phone_number = request.PhoneNumber;
        user.email = request.Email!;

        var result = await _extranetUserManager.UpdateAsync(user);

        if (result.errors is not null)
        {
            throw new BadRequestException(result.errors);
        }

        return Unit.Value;
    }
}