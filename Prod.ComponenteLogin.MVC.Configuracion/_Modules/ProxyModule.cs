using Autofac;
using Microsoft.Extensions.Configuration;
using Prod.ServiciosExternos;
using Prod.ServiciosExternos.PRODUCE_VIRTUAL;
using Prod.ServiciosExternos.PRODUCE_VIRTUAL.Roles;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.MVC.Configuracion._Modules
{
    public class ProxyModule : Autofac.Module
    {
        public static AppConfig AppConfig;
        public static IConfiguration Configuration;
        protected override void Load(ContainerBuilder builder)
        {
            //Proxy Local
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.ComponenteLogin.MVC.Configuracion")))
               .Where(type => type.Name.EndsWith("Proxy", StringComparison.Ordinal))
               .AsSelf();


            //Proxy Externos
            builder.RegisterType<ReniecServicio>().As<IReniecServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_RENIEC_API);
            builder.RegisterType<SunatServicio>().As<ISunatServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_SUNAT_API);
            builder.RegisterType<MigracionesServicio>().As<IMigracionesServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_MIGRACIONES_API);
            builder.RegisterType<ProduceVirtualServicio>().As<IProduceVirtualServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_PRODUCE_VIRTUAL);
            builder.RegisterType<PersonasServicio>().As<IPersonasServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_PERSONA_API);
            builder.RegisterType<RolesServicio>().As<IRolesServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_ROLES_API);
            var baseFolder = System.IO.Directory.GetCurrentDirectory();
            var rootTemplates = Path.Combine(baseFolder, "PlantillasCorreo");

            base.Load(builder);
        }
    }
}
