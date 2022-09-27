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
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

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

        services.AddScoped<ISunatServicio>(s =>
            new SunatServicio(options.Services.UrlSunat));
        services.AddScoped<ISunatService, SunatService>();

        services.AddScoped<IReniecServicio>(s =>
            new ReniecServicio(options.Services.UrlReniec));
        services.AddScoped<IReniecService, ReniecService>();
        
        services.AddScoped<IMigracionesServicio>(s =>
            new MigracionesServicio(options.Services.UrlReniec));
        services.AddScoped<IMigracionesService, MigracionesService>();

        services.AddScoped<IReCaptchaService, ReCaptchaService>();

        services.AddScoped<IExtranetUserManager, ExtranetUserManager>();
        services.AddScoped<IExtranetSignInManager, ExtranetSignInManager>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();


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
            options.Cookie.Path = "/";
            options.Cookie.HttpOnly = true;
            options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

            options.LoginPath = "/GetLogin";
            options.LogoutPath = "/GetLogout";
            //options.AccessDeniedPath = "/GetAccessDenied";
        });

        services.Configure<CookiePolicyOptions>(options =>
        {
            // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            options.CheckConsentNeeded = context => true;
            options.MinimumSameSitePolicy = SameSiteMode.None;
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
            options.User.RequireUniqueEmail = true;

            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;

            options.Tokens.EmailConfirmationTokenProvider = "EmailConfirmation";

            // Default Lockout settings.
            options.Lockout.AllowedForNewUsers = true;
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
        });

        services.Configure<PasswordHasherOptions>(option =>
        {
            // option.IterationCount = 10000;
            // option.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2;
        });
    }
}
