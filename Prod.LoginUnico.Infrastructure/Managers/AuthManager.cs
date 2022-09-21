using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Models;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System.Text;

namespace Prod.LoginUnico.Infrastructure.Managers;

public class AuthManager : IAuthManager
{
    private readonly UserManager<ExtranetUserEntity> _userManager;
    private readonly SignInManager<ExtranetUserEntity> _signInManager;
    private readonly ITokenManager _tokenManager;

    public AuthManager(
        UserManager<ExtranetUserEntity> userManager,
        SignInManager<ExtranetUserEntity> signInManager,
        ITokenManager tokenManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenManager = tokenManager;
    }

    public async Task<Token>
        LogIn(string username, string password)
    {
        var user = await _userManager
                .FindByNameAsync(username);

        if (user is null)
            throw new UnauthorizedAccessException("Usuario incorrecto.");

        SignInResult result = await _signInManager
            .CheckPasswordSignInAsync(
            user: user,
            password: password,
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
            throw new UnauthorizedAccessException("Revise las credenciales ingresadas.");

        return _tokenManager
            .GenerateToken(user);
    }
}

