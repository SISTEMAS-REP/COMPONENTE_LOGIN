using MediatR;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetAccountCommand 
    : IRequest
{
    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }
}
