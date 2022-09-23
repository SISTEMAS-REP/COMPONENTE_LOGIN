using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Infrastructure.Identity;

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
            .FindExtranetUser(email: normalizedEmail);
        return user;
    }

    public async Task<ExtranetUserEntity> 
        FindByIdAsync(string userId, 
        CancellationToken cancellationToken)
    {
        var user = await _extranetUserUnitOfWork
            .FindExtranetUser(extranetUserId: int.Parse(userId));
        return user;
    }

    public async Task<ExtranetUserEntity> 
        FindByNameAsync(string normalizedUserName, 
        CancellationToken cancellationToken)
    {
        var user = await _extranetUserUnitOfWork
            .FindExtranetUser(userName: normalizedUserName);
        return user;
    }

    public Task<int> 
        GetAccessFailedCountAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.access_failed_count);
    }

    public Task<string> 
        GetEmailAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.email);
    }

    public Task<bool> 
        GetEmailConfirmedAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.email_confirmed);
    }

    public Task<bool> 
        GetLockoutEnabledAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.lockout_enable);
    }

    public Task<DateTimeOffset?> 
        GetLockoutEndDateAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(
                user.lockout_end_date.HasValue ?
                    new DateTimeOffset(DateTime.SpecifyKind(user.lockout_end_date.Value, DateTimeKind.Utc)) :
                    new DateTimeOffset?());
    }

    public Task<string> 
        GetNormalizedEmailAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.email);
    }

    public Task<string> 
        GetNormalizedUserNameAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.user_name);
    }

    public Task<string> 
        GetPasswordHashAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(Convert.ToBase64String(user.password_hash));
    }

    public Task<string> 
        GetPhoneNumberAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.phone_number);
    }

    public Task<bool> 
        GetPhoneNumberConfirmedAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.phone_number_confirmed);
    }

    public Task<string> 
        GetSecurityStampAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(Convert.ToBase64String(user.security_stamp));
    }

    public Task<bool> 
        GetTwoFactorEnabledAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.two_factor_enabled);
    }

    public Task<string> 
        GetUserIdAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.id_usuario_extranet.ToString());
    }

    public Task<string> 
        GetUserNameAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.user_name);
    }

    public Task<bool> HasPasswordAsync(ExtranetUserEntity user, 
        CancellationToken cancellationToken)
    {
        return Task.FromResult(user.password_hash != null);
    }

    public Task<int> 
        IncrementAccessFailedCountAsync(ExtranetUserEntity user,
        CancellationToken cancellationToken)
    {
        user.access_failed_count++;
        return Task.FromResult(user.access_failed_count);
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
        user.lockout_end_date = lockoutEnd == DateTimeOffset.MinValue 
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
