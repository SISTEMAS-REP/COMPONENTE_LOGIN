using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Common;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Infrastructure.Identity;

public class PasswordHasher : IPasswordHasher
{
    public bool VerifyHashedPassword(ExtranetUserEntity user, string hashedPassword, string providedPassword)
    {
        return new PasswordHasher<ExtranetUserEntity>().VerifyHashedPassword(user, hashedPassword, providedPassword) != PasswordVerificationResult.Failed;
    }

    public string? HashPassword(ExtranetUserEntity user, string password)
    {
        return new PasswordHasher<ExtranetUserEntity>().HashPassword(user, password);
    }
}
