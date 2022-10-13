using MediatR;
using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Common.Wrappers;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System.Text;

namespace Prod.LoginUnico.Infrastructure.Identity.Managers;

public class ExtranetSignInManager : IExtranetSignInManager
{
    private SignInManager<ExtranetUserEntity> SignInManager { get; }
    private UserManager<ExtranetUserEntity> UserManager { get; }

    public ExtranetSignInManager(SignInManager<ExtranetUserEntity> signInManager,
        UserManager<ExtranetUserEntity> userManager)
    {
        SignInManager = signInManager;
        UserManager = userManager;
    }

    public async Task<Response<Unit>>
        LogIn(ExtranetUserEntity user, string password, bool rememberMe)
    {
        List<string> mensajes = new List<string>();

        var result = await SignInManager
            .PasswordSignInAsync(
            user: user,
            password: password,
            isPersistent: rememberMe,
            lockoutOnFailure: true);

        if (result.IsLockedOut)
        {
            var lockoutEnd = await UserManager.GetLockoutEndDateAsync(user);

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

            mensajes.Add(stringBuilder.ToString());

            throw new UnauthorizedAccessException(stringBuilder.ToString());
        }

        if (!result.Succeeded)
        {
            throw new UnauthorizedAccessException("Revise las credenciales ingresadas.");
        }

        return new();
    }
}
