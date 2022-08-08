using Autofac;
using Microsoft.Extensions.Configuration;
using Prod.ComponenteLogin.MVC.Configuracion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.Core.Api.App_Start
{
    public static class BootstrapperContainer
    {
        public static IConfiguration Configuration;
        public static AppConfig AppConfig;

        public static void Register(ContainerBuilder builder)
        {
            //Variables
            var appConfig = new AppConfig();
            Configuration.GetSection("AppConfig").Bind(appConfig);
            builder.Register(c => appConfig);

            //Proxy
            ProxyModule.AppConfig = appConfig;
            ProxyModule.Configuration = Configuration;
            builder.RegisterModule<ProxyModule>();

            //Add Context
            ContextDbModule.Configuration = Configuration;
            builder.RegisterModule<ContextDbModule>();

        }
    }
}
