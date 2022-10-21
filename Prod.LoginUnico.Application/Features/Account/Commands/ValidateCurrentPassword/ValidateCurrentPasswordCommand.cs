using MediatR;
using Prod.LoginUnico.Application.Common.Wrappers;

namespace Prod.LoginUnico.Application.Features.Account.Commands.ValidateCurrentPassword;

public  class ValidateCurrentPasswordCommand 
    : IRequest<Response<Unit>>
{
    public string password { get; set; }
}
