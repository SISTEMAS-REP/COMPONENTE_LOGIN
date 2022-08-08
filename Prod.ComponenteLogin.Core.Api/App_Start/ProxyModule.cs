using Autofac;
using Microsoft.Extensions.Configuration;
using Prod.ServiciosExternos;
using Prod.ServiciosExternos.PRODUCE_VIRTUAL;
using Prod.ComponenteLogin.MVC.Configuracion;

namespace Prod.ComponenteLogin.Core.Api.App_Start
{
	public class ProxyModule : Autofac.Module
	{
		public static AppConfig AppConfig;
		public static IConfiguration Configuration;

		protected override void Load(ContainerBuilder builder)
		{
			//Proxy

			//Proxy Externos

			builder.RegisterType<ReniecServicio>().As<IReniecServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_RENIEC_API);
			builder.RegisterType<SunatServicio>().As<ISunatServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_SUNAT_API);
			builder.RegisterType<MigracionesServicio>().As<IMigracionesServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_MIGRACIONES_API);

			builder.RegisterType<ProduceVirtualServicio>().As<IProduceVirtualServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_PRODUCE_VIRTUAL);
			builder.RegisterType<PersonasServicio>().As<IPersonasServicio>().WithParameter("baseUrl", AppConfig.Urls.URL_PERSONA_API);

			base.Load(builder);
		}
	}
}
