using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Prod.LoginUnico.Application.Common;
using Prod.LoginUnico.Domain.Entities;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Infrastructure.Identity;

public static class IdentityExtensions
{
    public static IServiceCollection AddIdentityCore(this IServiceCollection services)
    {
        services
            .AddIdentity<ExtranetUserEntity, RoleEntity>()
            .AddTokenProviders();

        services.AddTransient<IUserStore<ExtranetUserEntity>, ExtranetUserStore>();
        services.AddTransient<IRoleStore<RoleEntity>, RoleStore>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();

        ConfigureOptions(services);

        return services;
    }

    private static IdentityBuilder AddTokenProviders(this IdentityBuilder identityBuilder)
    {
        identityBuilder
            .AddDefaultTokenProviders()
            .AddTokenProvider<EmailConfirmationTokenProvider<ExtranetUserEntity>>("EmailConfirmation");

        return identityBuilder;
    }

    private static void ConfigureOptions(IServiceCollection services)
    {
        services.Configure<DataProtectionTokenProviderOptions>(options =>
        {
            options.TokenLifespan = TimeSpan.FromHours(3);
        });

        services.Configure<EmailConfirmationTokenProviderOptions>(options =>
        {
            options.TokenLifespan = TimeSpan.FromDays(2);
        });

        services.Configure<IdentityOptions>(options =>
        {
            options.Tokens.EmailConfirmationTokenProvider = "EmailConfirmation";

            // Default Lockout settings.
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.AllowedForNewUsers = true;
        });

        services.Configure<PasswordHasherOptions>(option =>
        {
            // option.IterationCount = 10000;
            // option.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2;
        });
    }
}
