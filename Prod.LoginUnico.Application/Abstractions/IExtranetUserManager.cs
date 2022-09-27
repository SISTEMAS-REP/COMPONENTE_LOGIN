using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Abstractions;

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
