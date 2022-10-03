using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Abstractions.Managers;

public interface IExtranetUserManager
{
    Task<ExtranetUserEntity>
        FindByNameAsync(string userName);

    Task<DateTimeOffset?>
        GetLockoutEndDateAsync(ExtranetUserEntity user);

    Task<(bool status, string? errors)>
        CreateAsync(ExtranetUserEntity user, string password);

    Task<bool>
        AddPasswordAsync(ExtranetUserEntity user, string password);
}
