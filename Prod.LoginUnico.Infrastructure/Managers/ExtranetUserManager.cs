using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System.Resources;

namespace Prod.LoginUnico.Infrastructure.Managers;

public class ExtranetUserManager : UserManager<ExtranetUserEntity>
{
    public ExtranetUserManager(IUserStore<ExtranetUserEntity> store, 
        IOptions<IdentityOptions> optionsAccessor, 
        IPasswordHasher<ExtranetUserEntity> passwordHasher, 
        IEnumerable<IUserValidator<ExtranetUserEntity>> userValidators,
        IEnumerable<IPasswordValidator<ExtranetUserEntity>> passwordValidators,
        ILookupNormalizer keyNormalizer, 
        IdentityErrorDescriber errors, 
        IServiceProvider services, 
        ILogger<UserManager<ExtranetUserEntity>> logger) 
        : base(store, 
            optionsAccessor, 
            passwordHasher, 
            userValidators, 
            passwordValidators, 
            keyNormalizer, 
            errors, 
            services, 
            logger)
    {
    }
}
