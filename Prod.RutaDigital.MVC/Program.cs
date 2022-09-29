using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Prod.RutaDigital.MVC.Models;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllersWithViews();

// Params
var ss = builder.Configuration
    .GetSection("SecuritySettings")
    .Get<SecuritySettings>();

builder.Services
    .AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(ss.KeyDirectory))
    .SetApplicationName(ss.ApplicationName);

builder.Services.AddScoped<CustomCookieAuthenticationEvents>();

builder.Services
    .AddAuthentication(o =>
    {
        o.DefaultScheme = IdentityConstants.ApplicationScheme;
        o.DefaultSignInScheme = IdentityConstants.ExternalScheme;
    })
    .AddCookie(IdentityConstants.ApplicationScheme, options =>
    {
        options.Cookie.Name = ss.CookieName;
        options.EventsType = typeof(CustomCookieAuthenticationEvents);
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();
//app.UseCookiePolicy();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

public class CustomCookieAuthenticationEvents 
    : CookieAuthenticationEvents
{
    public CustomCookieAuthenticationEvents()
    {
    }

    public override Task RedirectToLogin(RedirectContext<CookieAuthenticationOptions> redirectContext)
    {
        redirectContext.RedirectUri = "https://localhost:44428/auth/login-person" +
        "?applicationId=159" +
            "&returnUrl=https://localhost:7096";

        /*redirectContext.RedirectUri = "https://localhost:4200/sesion-persona" +
        "?id_aplicacion=98" +
            "&url=https://localhost:7096";*/

        /*redirectContext.RedirectUri = "https://localhost:7212/Identity/Account/Login" +
        "?id_aplicacion=98" +
            "&ReturnUrl=https://localhost:7096";*/



        return base.RedirectToLogin(redirectContext);
    }
}