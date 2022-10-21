using MediatR;

namespace Prod.LoginUnico.Application.Features.Account.Commands.ModificationPasswordCompany;

public class ModificationPasswordCompanyCommand 
    : IRequest
{
    public string Password { get; set; }
}
