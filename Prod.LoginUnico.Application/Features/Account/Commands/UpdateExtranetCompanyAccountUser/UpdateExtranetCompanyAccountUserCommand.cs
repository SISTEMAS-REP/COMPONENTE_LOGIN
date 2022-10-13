using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetCompanyAccountUserCommand : IRequest
{
    [FromRoute]
    public int UserId { get; set; }

    // Contacto
    public string? PhoneNumber { get; set; } // Digitado

    public string? Email { get; set; } // Digitado
}
