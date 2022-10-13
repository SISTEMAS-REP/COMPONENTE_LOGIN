using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Infrastructure.Identity.Stores;

public class ExtranetUserStore :
    IUserStore<ExtranetUserEntity>,
    IUserPasswordStore<ExtranetUserEntity>,
    IUserSecurityStampStore<ExtranetUserEntity>,
    IUserEmailStore<ExtranetUserEntity>,
    IUserPhoneNumberStore<ExtranetUserEntity>,
    IUserTwoFactorStore<ExtranetUserEntity>,
    IUserLockoutStore<ExtranetUserEntity>
//IUserAuthenticationTokenStore<ExtranetUserEntity>,
//IUserAuthenticatorKeyStore<ExtranetUserEntity>,
//IUserTwoFactorRecoveryCodeStore<ExtranetUserEntity>
{
    private readonly IExtranetUserUnitOfWork _extranetUserUnitOfWork;

    public ExtranetUserStore(IExtranetUserUnitOfWork extranetUserUnitOfWork)
    {
        _extranetUserUnitOfWork = extranetUserUnitOfWork;
    }

    public void Dispose()
    {
        _extranetUserUnitOfWork.ExecDispose();
    }

    public async Task<IdentityResult>
        CreateAsync(ExtranetUserEntity user,
                    CancellationToken cancellationToken)
    {
        var id = await _extranetUserUnitOfWork.Upsert(user);

        if (id <= 0)
        {
            return IdentityResult.Failed(new IdentityError
            {
                Description = $"No se pudo insertar el usuario: " +
                $"{user.user_name}."
            });
        }

        return IdentityResult.Success;
    }

    public Task<IdentityResult>
        DeleteAsync(ExtranetUserEntity user,
                    CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public async Task<ExtranetUserEntity>
        FindByEmailAsync(string normalizedEmail,
                         CancellationToken cancellationToken)
    {
        var user = await _extranetUserUnitOfWork
            .Find(email: normalizedEmail);
        return await Task.FromResult(user);
    }

    public async Task<ExtranetUserEntity>
        FindByIdAsync(string userId,
                      CancellationToken cancellationToken)
    {
        var user = await _extranetUserUnitOfWork
            .Find(extranetUserId: int.Parse(userId));

        if (user is null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        return user;
    }

    public async Task<ExtranetUserEntity>
        FindByNameAsync(string normalizedUserName,
                        CancellationToken cancellationToken)
    {
        var user = await _extranetUserUnitOfWork
            .Find(userName: normalizedUserName);

        return user;
    }

    public async Task<int>
        GetAccessFailedCountAsync(ExtranetUserEntity user,
                                  CancellationToken cancellationToken)
    {
        return await Task.FromResult(user.access_failed_count);
    }

    public async Task<string>
        GetEmailAsync(ExtranetUserEntity user,
                      CancellationToken cancellationToken)
    {
        return await Task.FromResult(user.email);
    }

    public async Task<bool>
        GetEmailConfirmedAsync(ExtranetUserEntity user,
                                CancellationToken cancellationToken)
    {
        return await Task.FromResult(user.email_confirmed);
    }

    public async Task<bool>
        GetLockoutEnabledAsync(ExtranetUserEntity user,
                               CancellationToken cancellationToken)
    {
        return await Task.FromResult(user.lockout_enable);
    }

    public async Task<DateTimeOffset?>
        GetLockoutEndDateAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return await Task.FromResult(
                user.lockout_end_date.HasValue ?
                    new DateTimeOffset(DateTime
                        .SpecifyKind(user.lockout_end_date.Value,
                            DateTimeKind.Utc)) :
                    new DateTimeOffset?());
    }

    public async Task<string>
        GetNormalizedEmailAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return await Task.FromResult(user.email);
    }

    public async Task<string>
        GetNormalizedUserNameAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return await Task
            .FromResult(user.user_name);
    }

    public async Task<string?>
        GetPasswordHashAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        if (user.password_hash is null)
        {
            return null;
        }

        return await Task
            .FromResult(Convert
                .ToBase64String(user.password_hash));
    }

    public async Task<string>
        GetPhoneNumberAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return await Task
            .FromResult(user.phone_number ?? "");
    }

    public Task<bool>
        GetPhoneNumberConfirmedAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return Task
            .FromResult(user.phone_number_confirmed);
    }

    public async Task<string>
        GetSecurityStampAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return await Task
            .FromResult(Convert
                .ToBase64String(user.security_stamp));
    }

    public async Task<bool>
        GetTwoFactorEnabledAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return await Task
            .FromResult(user.two_factor_enabled);
    }

    public async Task<string>
        GetUserIdAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return await Task
            .FromResult(user.id_usuario_extranet
                .ToString());
    }

    public async Task<string>
        GetUserNameAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return await Task
            .FromResult(user.user_name);
    }

    public Task<bool> HasPasswordAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        return Task
            .FromResult(user.password_hash != null);
    }

    public async Task<int>
        IncrementAccessFailedCountAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        user.access_failed_count++;
        return await Task
            .FromResult(user.access_failed_count);
    }

    public Task
        ResetAccessFailedCountAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        user.access_failed_count = 0;
        return Task.CompletedTask;
    }

    public Task
        SetEmailAsync(ExtranetUserEntity user, string email,
        CancellationToken cancellationToken)
    {
        user.email = email;
        return Task.CompletedTask;
    }

    public Task
        SetEmailConfirmedAsync(ExtranetUserEntity user, bool confirmed,
        CancellationToken cancellationToken)
    {
        user.email_confirmed = confirmed;
        return Task.CompletedTask;
    }

    public Task
        SetLockoutEnabledAsync(ExtranetUserEntity user, bool enabled,
        CancellationToken cancellationToken)
    {
        user.lockout_enable = enabled;
        return Task.CompletedTask;
    }

    public Task
        SetLockoutEndDateAsync(ExtranetUserEntity user, DateTimeOffset? lockoutEnd,
        CancellationToken cancellationToken)
    {
        user.lockout_end_date =
            lockoutEnd is null ||
            lockoutEnd == DateTimeOffset.MinValue
            ? null
            : new DateTime?(lockoutEnd.Value.DateTime);
        return Task.CompletedTask;
    }

    public Task
        SetNormalizedEmailAsync(ExtranetUserEntity user, string normalizedEmail,
        CancellationToken cancellationToken)
    {
        user.email = normalizedEmail;
        return Task.CompletedTask;
    }

    public Task
        SetNormalizedUserNameAsync(ExtranetUserEntity user, string normalizedName,
        CancellationToken cancellationToken)
    {
        user.user_name = normalizedName;
        return Task.CompletedTask;
    }

    public Task
        SetPasswordHashAsync(ExtranetUserEntity user, string passwordHash,
        CancellationToken cancellationToken)
    {
        user.password_hash = Convert.FromBase64String(passwordHash);
        return Task.CompletedTask;
    }

    public Task
        SetPhoneNumberAsync(ExtranetUserEntity user, string phoneNumber,
        CancellationToken cancellationToken)
    {
        user.phone_number = phoneNumber;
        return Task.CompletedTask;
    }

    public Task
        SetPhoneNumberConfirmedAsync(ExtranetUserEntity user, bool confirmed,
        CancellationToken cancellationToken)
    {
        user.phone_number_confirmed = confirmed;
        return Task.CompletedTask;
    }

    public Task
        SetSecurityStampAsync(ExtranetUserEntity user, string stamp,
        CancellationToken cancellationToken)
    {
        user.security_stamp = Guid.NewGuid().ToByteArray(); //stamp;
        return Task.CompletedTask;
    }

    public Task
        SetTwoFactorEnabledAsync(ExtranetUserEntity user, bool enabled,
        CancellationToken cancellationToken)
    {
        user.two_factor_enabled = enabled;
        return Task.CompletedTask;
    }

    public Task
        SetUserNameAsync(ExtranetUserEntity user, string userName,
        CancellationToken cancellationToken)
    {
        user.user_name = userName;
        return Task.CompletedTask;
    }

    public async Task<IdentityResult>
        UpdateAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        var id = await _extranetUserUnitOfWork.Upsert(user);

        if (id <= 0)
        {
            return IdentityResult.Failed(new IdentityError
            {
                Description = $"No se pudo actualizar el usuario: " +
                $"{user.user_name}."
            });
        }

        return IdentityResult.Success;
    }
}
