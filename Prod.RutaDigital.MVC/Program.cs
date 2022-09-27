using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services
    .AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"C:\Key"))
    .SetApplicationName("Prod.LoginUnico");

builder.Services.AddScoped<CustomCookieAuthenticationEvents>();

builder.Services
    .AddAuthentication("Identity.Application")
    .AddCookie("Identity.Application", options =>
    {
        options.Cookie.Name = ".AspNet.SharedCookie";
        options.Cookie.HttpOnly = true;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

        /*options.LoginPath = "/GetLogin";
        options.LogoutPath = "/GetLogout";
        options.AccessDeniedPath = "/GetAccessDenied";*/

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

app.UseHttpsRedirection();
app.UseStaticFiles();

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
        //var context = redirectContext.HttpContext;
        redirectContext.RedirectUri = "https://localhost:4200/#/session-persona" +
            "?applicationId=232" +
            "&returnUrl=https://localhost:7096";
        return base.RedirectToLogin(redirectContext);
    }
}