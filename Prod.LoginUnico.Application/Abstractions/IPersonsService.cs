using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IPersonsService
{
    Task<int> 
        InsertOrUpdatePerson(ExtranetRegisterCommand request, UserAudit userAudit);
}
