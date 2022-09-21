using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Prod.LoginUnico.Application;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Infrastructure;
using Prod.LoginUnico.Infrastructure.Identity;
using Prod.LoginUnico.Persistence;
using Prod.LoginUnico.Web;
using Prod.LoginUnico.Web.Services;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

var AppSettings = new AppSettings();
builder.Configuration.Bind(AppSettings);

builder.Services.Configure<AppSettings>(builder.Configuration);

builder.Services
    .AddPresentation()
    .AddApplication()
    .AddPersistence(AppSettings.ConnectionStrings.DefaultConnection)
    .AddInfrastructure()
    .AddIdentityCore();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ClockSkew = TimeSpan.Zero,

            ValidIssuer = AppSettings.Authorization.Issuer,
            ValidAudience = AppSettings.Authorization.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(AppSettings.Authorization.SecurityKey)),
            LifetimeValidator = (notBefore, expires, securityToken,
            validationParameters) => expires != null
                                        ? expires > DateTime.UtcNow
                                        : false,
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    //app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSwaggerUi3(settings =>
{
    settings.Path = "/api";
    settings.DocumentPath = "/api/specification.json";
});

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
