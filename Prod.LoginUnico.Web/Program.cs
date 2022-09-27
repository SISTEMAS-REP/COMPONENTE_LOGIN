using Prod.LoginUnico.Application;
using Prod.LoginUnico.Application.Common.Constants;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Infrastructure;
using Prod.LoginUnico.Persistence;
using Prod.LoginUnico.Web;
using Serilog;

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
    .AddPersistence(AppSettings)
    .AddInfrastructure(AppSettings);

builder.Services
    .AddCors(options => 
    {
        options
            .AddPolicy(Constants.DefaultCorsPolicy, builder =>
            {
                var corsList = AppSettings.Cors.AllowedHosts.ToArray();
                builder.WithOrigins(corsList)
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
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
app.UseCookiePolicy();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.UseCors(Constants.DefaultCorsPolicy);

app.MapFallbackToFile("index.html"); ;

app.Run();
