using MediatR;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Abstractions.Managers;

public interface IExtranetSignInManager
{
    Task<Response<Unit>>
        LogIn(ExtranetUserEntity user,
              string password,
              bool rememberMe);
}
