using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using Prod.LoginUnico.Infrastructure.Identity;
using Prod.LoginUnico.Infrastructure.Managers;
using Prod.LoginUnico.Application.Common;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Prod.ServiciosExternos;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Domain.Entities.RoleEntity;
using Prod.LoginUnico.Infrastructure.Services;

namespace Prod.LoginUnico.Infrastructure;

public static class InfrastructureExtensions
{
    public static IServiceCollection
        AddInfrastructure(
        this IServiceCollection services, AppSettings options)
    {
        services.AddScoped<IPersonasServicio>(s => 
            new PersonasServicio(options.Services.UrlPersons));
        services.AddScoped<IPersonsService, PersonsService>();

        services.AddScoped<IExtranetUserManager, ExtranetUserManager>();
        services.AddScoped<IExtranetSignInManager, ExtranetSignInManager>();

        services.AddIdentity();

        return services;
    }

    public static IServiceCollection AddIdentity(this IServiceCollection services)
    {
        services
            .AddIdentity<ExtranetUserEntity, RoleEntity>()
            .AddTokenProviders();

        services.AddTransient<IUserStore<ExtranetUserEntity>, ExtranetUserStore>();
        services.AddTransient<IRoleStore<RoleEntity>, RoleStore>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddDataProtection()
            .UseCryptographicAlgorithms(
            new AuthenticatedEncryptorConfiguration()
            {
                EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC,
                ValidationAlgorithm = ValidationAlgorithm.HMACSHA256
            })
            .PersistKeysToFileSystem(new DirectoryInfo(@"C:\Key"))
            .SetApplicationName("Prod.LoginUnico")
            .SetDefaultKeyLifetime(TimeSpan.FromDays(600));

        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.Name = ".AspNet.SharedCookie";
            options.Cookie.Domain = "localhost";

            options.Cookie.HttpOnly = true;
            options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

            options.LoginPath = "/Identity/Account/Login";
            options.AccessDeniedPath = "/Identity/Account/AccessDenied";
            options.SlidingExpiration = true;
        });

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
