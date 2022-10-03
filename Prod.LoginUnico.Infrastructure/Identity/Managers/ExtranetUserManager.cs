using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Infrastructure.Identity.Managers;

public class ExtranetUserManager : IExtranetUserManager
{
    private UserManager<ExtranetUserEntity> UserManager { get; }

    public ExtranetUserManager(UserManager<ExtranetUserEntity> userManager)
    {
        UserManager = userManager;
    }

    // Buscar usuario por user_name
    public async Task<ExtranetUserEntity>
        FindByNameAsync(string userName)
    {
        var user = await UserManager
            .FindByNameAsync(userName);
        return user;
    }

    // Buscar fecha fin del bloqueo de acceso para un usuario
    public async Task<DateTimeOffset?>
        GetLockoutEndDateAsync(ExtranetUserEntity user)
    {
        var lockoutEndDate = await UserManager
            .GetLockoutEndDateAsync(user);
        return lockoutEndDate;
    }

    // Crear un usuario
    public async Task<(bool status, string? errors)>
        CreateAsync(ExtranetUserEntity user, string password)
    {
        var result = await UserManager
            .CreateAsync(
            user: user,
            password: password);

        if (result.Succeeded)
            return (status: true, errors: null);

        var errors = result.Errors
            .Select(e => $"{e.Code} : {e.Description}")
            .Aggregate((i, j) => i + "\n" + j);

        return (status: false, errors);
    }

    // Forzar la actualización de la contraseña para un usuario
    public async Task<bool>
        AddPasswordAsync(ExtranetUserEntity user, string password)
    {
        user.password_hash = null;
        var result = await UserManager
            .AddPasswordAsync(user, password);
        return result.Succeeded;
    }
}