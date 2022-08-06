using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Prod.ComponenteLogin.MVC.Configuracion._Modules;
using Prod.Seguridad.Auth;
using Release.Helper.WebKoMvc.Common;
using Release.Helper.WebKoMvc.Controllers;
using Serilog;
using System;


namespace Prod.ComponenteLoginAngular.MVC
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; set; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {

            Log.Logger = new LoggerConfiguration()
               .MinimumLevel.Verbose()
               .Enrich.FromLogContext()
               .WriteTo.File("Log/Log-.txt", rollingInterval: RollingInterval.Day)
               .CreateLogger();


            var basePath = AppDomain.CurrentDomain.BaseDirectory; //#SDK 2.00

            var builder = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
            Environment = env;

            BaseController.StartConfig(); //Leer Config     
            SecurityConfig.Init((IConfigurationRoot)Configuration);
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            //Encryts

#if DEBUG
            HelperHttp.AllowEncrypt = false;
#elif !DEBUG
            HelperHttp.AllowEncrypt = true;
#endif

            HelperHttp.WebRootPath = Environment.WebRootPath;

            //Register Types
            BootstrapperContainer.Configuration = this.Configuration;
            BootstrapperContainer.Register(builder);
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthorization();
            services.AddCustomAuthentication(false);
            services.AddMvc(o =>
            {
                o.Filters.Add(new ProducesAttribute("application/json"));
                o.EnableEndpointRouting = false;
            });
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot/dist";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseSecurityHeadersMiddleware(new SecurityHeadersBuilder()
                .AddDefaultSecurePolicy()
            );
            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseMvc(routes =>
            {

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                   name: "catch-all",
                   template: "{*url}",
                   defaults: new { controller = "Home", action = "Index" }
               );
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
            });
        }

        private void Areas(IRouteBuilder routes)
        {
            routes.MapRoute(
                name: "area",
                template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
        }
    }
}
