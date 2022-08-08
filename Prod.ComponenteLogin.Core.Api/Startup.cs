using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Prod.ComponenteLogin.Core.Api.App_Start;
using Prod.ComponenteLogin.MVC.Configuracion;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.Core.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            
            Log.Logger = new LoggerConfiguration()
                            .MinimumLevel.Warning()
                            .Enrich.FromLogContext()
                            .WriteTo.File("Log/Log-.txt", rollingInterval: RollingInterval.Day)
                            .CreateLogger();

            var basePath = AppDomain.CurrentDomain.BaseDirectory;

            var builder = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }       

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMvc(options =>
            {
                options.Filters.Add(new ProducesAttribute("application/json"));
                options.EnableEndpointRouting = false;
            })
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
                options.JsonSerializerOptions.DictionaryKeyPolicy = null;
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            //Register Types
            var da = new AppConfig();
            Configuration.GetSection("AppConfig").Bind(da);

            //Register Types
            BootstrapperContainer.AppConfig = da;
            BootstrapperContainer.Configuration = Configuration;
            BootstrapperContainer.Register(builder);

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddSerilog();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseMvc();
            app.Run(context => context.Response.WriteAsync($"<h1 style='color:blue;'>Prod.ComponenteLogin.Core.API Environment: {env.EnvironmentName}</h1>"));
        }
    }
}
