using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Infrastructure.Managers;

public class ExtranetUserManager : IExtranetUserManager
{
    private UserManager<ExtranetUserEntity> UserManager { get; }

	public ExtranetUserManager(UserManager<ExtranetUserEntity> userManager)
	{
        UserManager = userManager;	
	}

	public async Task<ExtranetUserEntity> 
		FindByNameAsync(string userName)
	{
		return await UserManager.FindByNameAsync(userName);
    }

	public async Task<DateTimeOffset?> 
		GetLockoutEndDateAsync(ExtranetUserEntity user)
	{
		return await UserManager.GetLockoutEndDateAsync(user);
    }
}
