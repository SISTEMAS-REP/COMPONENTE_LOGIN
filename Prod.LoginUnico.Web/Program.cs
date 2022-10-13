using Prod.LoginUnico.Application;
using Prod.LoginUnico.Application.Common.Constants;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Infrastructure;
using Prod.LoginUnico.Persistence;
using Prod.LoginUnico.Web;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

var basePath = AppDomain.CurrentDomain.BaseDirectory; //#SDK 2.00

var configBuilder = new ConfigurationBuilder()
    .SetBasePath(basePath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env ?? "Production"}.json", optional: true)
    .AddEnvironmentVariables()
    .Build();

builder.WebHost.UseConfiguration(configBuilder);

builder.Host.UseSerilog();

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

var AppSettings = new AppSettings();
builder.Configuration.Bind(AppSettings);

builder.Services.Configure<AppSettings>(builder.Configuration);

builder.Services
    .AddApplication()
    .AddInfrastructure(AppSettings, builder.Environment)
    .AddPresentation();

builder.Services
    .AddIdentity(AppSettings)
    .AddPersistence(AppSettings);

builder.Services.AddPersistence(AppSettings);

var app = builder.Build();

app.Logger.LogInformation("Starting Application");

try
{
    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");
    }

    app.ConfigureExceptionHandler(
        app.Services.GetRequiredService<ILogger<Program>>());

    app.UseCookiePolicy();
    app.UseHttpsRedirection();
    app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseRouting();

    app.UseCors(Constants.DefaultCorsPolicy);
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");

    app.MapFallbackToFile("index.html"); ;

    //app.Run(context => context.Response.WriteAsync($"<h1 style='color:blue;'>Prod.LoginUnico.Web > Environment: {app.Environment.EnvironmentName}</h1>"));
    app.Run();
} catch (Exception ex)
{
    app.Logger.LogError(ex, "[ExMessage: {@Message}]", ex.Message);
}