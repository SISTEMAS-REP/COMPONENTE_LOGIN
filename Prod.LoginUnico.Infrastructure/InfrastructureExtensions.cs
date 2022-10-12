using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using Prod.LoginUnico.Infrastructure.Identity;
using Prod.LoginUnico.Application.Common;
using Microsoft.AspNetCore.DataProtection;
using Prod.ServiciosExternos;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Domain.Entities.RoleEntity;
using Prod.LoginUnico.Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Prod.LoginUnico.Application.Common.Constants;
using Microsoft.AspNetCore.Hosting;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Infrastructure.Identity.Stores;
using Prod.LoginUnico.Infrastructure.Identity.Managers;

namespace Prod.LoginUnico.Infrastructure;

public static class InfrastructureExtensions
{
    public static IServiceCollection
        AddInfrastructure(
        this IServiceCollection services, 
        AppSettings options, 
        IWebHostEnvironment environment)
    {
        services.Configure<CookiePolicyOptions>(options =>
        {
            options.CheckConsentNeeded = context => true;
            options.MinimumSameSitePolicy = SameSiteMode.Lax;
        });

        services.AddScoped<IPersonasServicio>(s => 
            new PersonasServicio(options.Services?.UrlPersons));
        services.AddScoped<IPersonasService, PersonasService>();

        services.AddScoped<ISunatServicio>(s =>
            new SunatServicio(options.Services?.UrlSunat));

        services.AddScoped<IReniecServicio>(s =>
            new ReniecServicio(options.Services?.UrlReniec));
        
        services.AddScoped<IMigracionesServicio>(s =>
            new MigracionesServicio(options.Services?.UrlMigraciones));

        var ff = AppDomain.CurrentDomain.BaseDirectory;
        var baseFolder = options.Urls.Url_domain_login_unico!;/* AppDomain.CurrentDomain.BaseDirectory;*/
        var rootTemplates = Path.Combine(baseFolder, "Plantillas");
        EmailSender.Templates = SenderManager.GetEmailTemplates(rootTemplates, EmailSender.Templates);

        services.AddScoped<IEmailSender>(s =>
            new EmailSender(options.Services?.UrlCorreo));

        services.AddScoped<IReCaptchaService, ReCaptchaService>();

        services.AddScoped<IExtranetUserManager, ExtranetUserManager>();
        services.AddScoped<IExtranetSignInManager, ExtranetSignInManager>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddHttpContextAccessor()
            .AddResponseCompression()
            .AddMemoryCache()
            .AddHealthChecks();

        services.AddCustomCors(options);

        return services;
    }

    private static IServiceCollection 
        AddCustomCors(this IServiceCollection services, AppSettings options)
    {
        services.AddCors(o =>
        {
            o.AddPolicy(Constants.DefaultCorsPolicy,
                builder =>
                {
                    var corsList = options.Cors?.AllowedHosts!;
                    builder.WithOrigins(corsList)
                        .AllowCredentials()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });

        return services;
    }


    public static IServiceCollection 
        AddIdentity(this IServiceCollection services,AppSettings appSettings)
    {
        services
            .AddIdentity<ExtranetUserEntity, RoleEntity>()
            .AddTokenProviders();

        services.AddTransient<IUserStore<ExtranetUserEntity>, ExtranetUserStore>();
        services.AddTransient<IRoleStore<RoleEntity>, RoleStore>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddDataProtection()
            .PersistKeysToFileSystem(new DirectoryInfo(appSettings.SecuritySettings.KeyDirectory))
            .SetApplicationName(appSettings.SecuritySettings.ApplicationName);

        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.Name = appSettings.SecuritySettings.CookieName;
            options.Cookie.SameSite = SameSiteMode.Lax;
        });

        services.AddAntiforgery(o => o.SuppressXFrameOptionsHeader = true);

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

            options.Lockout.AllowedForNewUsers = true;
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
        });

        services.Configure<PasswordHasherOptions>(option =>
        {

        });
    }
}
