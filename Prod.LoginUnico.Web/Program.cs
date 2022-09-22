using Prod.LoginUnico.Application;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Infrastructure;
using Prod.LoginUnico.Persistence;
using Prod.LoginUnico.Web;
using Serilog;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
.AddInfrastructure();

builder.Services
    .AddCors(options => 
    {
        options
            .AddPolicy("ProdCors", builder =>
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

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.UseCors("ProdCors");

app.MapFallbackToFile("index.html"); ;

app.Run();
