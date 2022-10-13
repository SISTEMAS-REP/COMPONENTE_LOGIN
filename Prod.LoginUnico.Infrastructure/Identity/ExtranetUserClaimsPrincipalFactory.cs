using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System.Security.Claims;

namespace Prod.LoginUnico.Infrastructure.Identity;

public class ExtranetUserClaimsPrincipalFactory 
    : UserClaimsPrincipalFactory<ExtranetUserEntity>
{
    //private readonly ICurrentUserService _currentUserService;

    public ExtranetUserClaimsPrincipalFactory(
        UserManager<ExtranetUserEntity> userManager, 
        IOptions<IdentityOptions> optionsAccessor/*,
        ICurrentUserService currentUserService*/)
        : base(userManager, optionsAccessor)
    {
        //_currentUserService = currentUserService;
    }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ExtranetUserEntity user)
    {
        ClaimsIdentity claims = await base.GenerateClaimsAsync(user);
        claims
            .AddClaim(new Claim("JuridicPersonId", user.id_persona_juridica.ToString()));
        claims
            .AddClaim(new Claim("NaturalPersonId", user.id_persona_natural.ToString()));
        return claims;
    }
}