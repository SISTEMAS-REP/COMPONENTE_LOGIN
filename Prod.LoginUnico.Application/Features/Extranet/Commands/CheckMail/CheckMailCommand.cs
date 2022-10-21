using MediatR;
using Prod.LoginUnico.Application.Common.Wrappers;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.CheckMail;

public class CheckMailCommand 
    : IRequest<Response<Unit>>
{
    public int applicationId { get; set; }
    public int? personType { get; set; }
    public string? RecaptchaToken { get; set; }
    public string? UserName { get; set; }
    public string? password { get; set; }
    public string? identificador { get; set; }
}
