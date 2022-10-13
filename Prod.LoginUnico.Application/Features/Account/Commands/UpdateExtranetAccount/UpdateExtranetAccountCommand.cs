using MediatR;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetAccountCommand : IRequest
{
    // Contacto
    public string? PhoneNumber { get; set; } // Digitado

    public string? Email { get; set; } // Digitado
}
