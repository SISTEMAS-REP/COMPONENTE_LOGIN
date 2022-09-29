using Microsoft.AspNetCore.HttpOverrides;
using Prod.LoginUnico.Application;
using Prod.LoginUnico.Application.Common.Constants;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Identity;
using Prod.LoginUnico.Infrastructure;
using Prod.LoginUnico.Persistence;
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
    .AddApplication()
    .AddInfrastructure(AppSettings, builder.Environment)
    .AddPresentation();

builder.Services
    .AddIdentity()
    .AddPersistence(AppSettings);

var app = builder.Build();

// https://github.com/openiddict/openiddict-core/issues/518
// And
// https://github.com/aspnet/Docs/issues/2384#issuecomment-297980490
var forwardOptions = new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
};
forwardOptions.KnownNetworks.Clear();
forwardOptions.KnownProxies.Clear();

app.UseForwardedHeaders(forwardOptions);

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseResponseCompression();
}

app.UseCookiePolicy();
//app.UseCustomExceptionHandler();
app.UseHealthChecks("/health");
app.UseHttpsRedirection();
app.UseStaticFiles();


app.UseRouting();
app.UseCors(Constants.DefaultCorsPolicy);

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
    endpoints.MapRazorPages();
});

app.MapRazorPages();

app.Run();
