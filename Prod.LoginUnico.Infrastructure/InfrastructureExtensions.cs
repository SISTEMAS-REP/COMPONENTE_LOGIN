using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using Prod.LoginUnico.Infrastructure.Identity;
using Prod.LoginUnico.Infrastructure.Managers;
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

namespace Prod.LoginUnico.Infrastructure;

public static class InfrastructureExtensions
{
    private static void ChecksSameSite(HttpContext httpContext, CookieOptions options)
    {
        if (options.SameSite == SameSiteMode.None)
        {
            var userAgent = httpContext.Request.Headers["User-Agent"].ToString();
            if (userAgent == "someoldbrowser")
            {
                options.SameSite = SameSiteMode.Unspecified;
            }
        }
    }

    public static IServiceCollection
        AddInfrastructure(
        this IServiceCollection services, AppSettings options, IWebHostEnvironment environment)
    {
        services.Configure<CookiePolicyOptions>(options =>
        {
            // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            options.CheckConsentNeeded = context => true;
            options.MinimumSameSitePolicy = SameSiteMode.Lax;
        });

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
                    var corsList = options.Cors.AllowedHosts;
                    builder.WithOrigins(corsList)
                        .AllowCredentials()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
        });

        return services;
    }


    public static IServiceCollection 
        AddIdentity(this IServiceCollection services)
    {
        services
            .AddIdentity<ExtranetUserEntity, RoleEntity>()
            .AddTokenProviders();
        /*services
            .AddDefaultIdentity<ExtranetUserEntity>(options => 
                options.SignIn.RequireConfirmedAccount = true)
            .AddTokenProviders();*/

        services.AddTransient<IUserStore<ExtranetUserEntity>, ExtranetUserStore>();
        services.AddTransient<IRoleStore<RoleEntity>, RoleStore>();
        services.AddScoped<IPasswordHasher, PasswordHasher>();

        services.AddDataProtection()
            .PersistKeysToFileSystem(new DirectoryInfo(@"C:\Key"))
            .SetApplicationName("SharedCookieApp");

        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.Name = ".AspNet.SharedCookie.Extranet";
            options.Cookie.SameSite = SameSiteMode.Lax;
            /*options.Cookie.SameSite = SameSiteMode.None;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;*/
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
