using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System.Text;

namespace Prod.LoginUnico.Infrastructure.Managers;

public class AuthManager : IAuthManager
{
    private readonly UserManager<ExtranetUserEntity> _userManager;
    private readonly SignInManager<ExtranetUserEntity> _signInManager;
    private readonly IExtranetUserUnitOfWork _extranetUserUnitOfWork;

    public AuthManager(
        UserManager<ExtranetUserEntity> userManager,
        SignInManager<ExtranetUserEntity> signInManager,
        IExtranetUserUnitOfWork extranetUserUnitOfWork)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        this._extranetUserUnitOfWork = extranetUserUnitOfWork;
    }

    public async Task<bool>
        LogIn(string username, string password, bool rememberMe)
    {
        var user = await _userManager
                .FindByNameAsync(username);

        //Consultar
        var aplicacion = await _extranetUserUnitOfWork.BuscarAplicacionByUserName(username, 159);

        if (aplicacion is null)
        {
            throw new UnauthorizedAccessException("El usuario no tiene permisos a la aplicacion");
        }

        if (user is null)
        {
            throw new UnauthorizedAccessException("Usuario incorrecto.");
        }

        var result = await _signInManager
            .PasswordSignInAsync(
            user: user,
            password: password,
            isPersistent: rememberMe,
            lockoutOnFailure: true);

        if (result.IsLockedOut)
        {
            var lockoutEnd = await _userManager.GetLockoutEndDateAsync(user);

            StringBuilder stringBuilder = new StringBuilder("");

            stringBuilder.Append("Su cuenta ha sido bloqueada.");

            if (lockoutEnd != DateTimeOffset.MinValue)
            {
                TimeZoneInfo localZone = TimeZoneInfo
                .FindSystemTimeZoneById("SA Pacific Standard Time");

                var dtLockoutEnd = TimeZoneInfo
                    .ConvertTimeFromUtc(lockoutEnd.GetValueOrDefault().DateTime,
                    localZone);

                stringBuilder
                    .Append(" Podrá intentar nuevamete a las ")
                    .Append(dtLockoutEnd.ToString("hh:mm:ss tt"))
                    .Append(" del día ")
                    .Append(dtLockoutEnd.ToString("dd/MM/yyyy"));
            }

            throw new UnauthorizedAccessException(stringBuilder.ToString());
        }

        if (!result.Succeeded)
        {
            throw new UnauthorizedAccessException("Revise las credenciales ingresadas.");
        }

        return true;
    }
}

