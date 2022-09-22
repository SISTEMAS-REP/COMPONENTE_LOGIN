using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Infrastructure.Managers;

/*
public class ExtranetSignInManager<TUser> : SignInManager<TUser>
    where TUser : class
{
    public ExtranetSignInManager(UserManager<TUser> userManager, 
        IHttpContextAccessor contextAccessor, 
        IUserClaimsPrincipalFactory<TUser> claimsFactory, 
        IOptions<IdentityOptions> optionsAccessor, 
        ILogger<SignInManager<TUser>> logger, 
        IAuthenticationSchemeProvider schemes, 
        IUserConfirmation<TUser> confirmation) 
        : base(userManager, contextAccessor, claimsFactory, optionsAccessor, logger, schemes, confirmation)
    {
    }
}
*/

public class ExtranetSignInManager : SignInManager<ExtranetUserEntity>
{
    public ExtranetSignInManager(UserManager<ExtranetUserEntity> userManager, 
        IHttpContextAccessor contextAccessor, 
        IUserClaimsPrincipalFactory<ExtranetUserEntity> claimsFactory, 
        IOptions<IdentityOptions> optionsAccessor, 
        ILogger<SignInManager<ExtranetUserEntity>> logger, 
        IAuthenticationSchemeProvider schemes, 
        IUserConfirmation<ExtranetUserEntity> confirmation) 
        : base(userManager, contextAccessor, claimsFactory, optionsAccessor, logger, schemes, confirmation)
    {
    }
}
