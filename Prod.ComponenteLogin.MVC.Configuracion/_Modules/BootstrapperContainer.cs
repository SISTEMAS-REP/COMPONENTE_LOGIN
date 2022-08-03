using Autofac;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.MVC.Configuracion._Modules
{
    public static class BootstrapperContainer
    {
        public static IConfiguration Configuration;
        public static IWebHostEnvironment Environment;

        public static void Register(ContainerBuilder builder)
        {
            //Variables
            var appConfig = new AppConfig();
            Configuration.GetSection("AppConfig").Bind(appConfig);
            builder.Register(c => appConfig);

            var appSettings = new AppSettings();
            Configuration.GetSection("AppSettings").Bind(appSettings);
            builder.Register(c => appSettings);

            //Extras
            ExtraModule.AppConfig = appConfig;
            ExtraModule.AppSettings = appSettings;
            ExtraModule.Environment = Environment;
            builder.RegisterModule<ExtraModule>();

            //Proxys  
            ProxyModule.AppConfig = appConfig;
            ProxyModule.Configuration = Configuration;
            builder.RegisterModule<ProxyModule>();
        }
    }
}
