using MediatR;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IExtranetSignInManager
{
    Task<Unit>
        LogIn(ExtranetUserEntity user, string password, bool rememberMe);
}
