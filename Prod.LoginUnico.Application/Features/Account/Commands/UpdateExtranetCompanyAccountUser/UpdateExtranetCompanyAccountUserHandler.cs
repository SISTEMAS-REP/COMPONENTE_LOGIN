using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Common.Exceptions;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetCompanyAccountUserHandler
    : IRequestHandler<UpdateExtranetCompanyAccountUserCommand>
{
    private readonly IExtranetUserManager _extranetUserManager;

    public UpdateExtranetCompanyAccountUserHandler(IExtranetUserManager extranetUserManager)
    {
        _extranetUserManager = extranetUserManager;
    }

    public async Task<Unit>
        Handle(UpdateExtranetCompanyAccountUserCommand request,
               CancellationToken cancellationToken)
    {
        var user = await _extranetUserManager.FindByIdAsync(request.UserId.ToString());

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