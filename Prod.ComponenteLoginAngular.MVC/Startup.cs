using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Prod.ComponenteLogin.MVC.Configuracion._Modules;
using Release.Helper.WebKoMvc.Common;
using Release.Helper.WebKoMvc.Controllers;
using Serilog;
using System;

namespace Prod.ComponenteLoginAngular.MVC
{
    public class Startup
    {
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
            //SecurityConfig.Init((IConfigurationRoot)Configuration);

        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
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
            //BootstrapperContainer.Environment = this.Environment;
            BootstrapperContainer.Register(builder);
        }
    }
}
