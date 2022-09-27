using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Common;

public interface IPasswordHasher
{
    bool 
        VerifyHashedPassword(ExtranetUserEntity user, string hashedPassword, string providedPassword);

    string? 
        HashPassword(ExtranetUserEntity user, string password);
}
