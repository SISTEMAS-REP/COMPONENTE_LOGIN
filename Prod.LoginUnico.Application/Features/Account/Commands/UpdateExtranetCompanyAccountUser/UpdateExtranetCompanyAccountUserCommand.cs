using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetCompanyAccountUserCommand : IRequest
{
    [FromRoute]
    public int UserId { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public bool? Activo { get; set; }
}
