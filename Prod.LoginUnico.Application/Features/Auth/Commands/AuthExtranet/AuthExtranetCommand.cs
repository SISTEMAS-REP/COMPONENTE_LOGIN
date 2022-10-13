using MediatR;

namespace Prod.LoginUnico.Application.Features.Auth.Commands.AuthExtranet;

public class AuthExtranetCommand : IRequest
{
    public int? PersonType { get; set; }

    public string? RucNumber { get; set; }

    public string? DocumentNumber { get; set; }

    public string? Password { get; set; }

    public bool? RememberMe { get; set; }

    public string? ReturnUrl { get; set; }

    public int? ApplicationId { get; set; }

    public string? RecaptchaToken { get; set; }
}