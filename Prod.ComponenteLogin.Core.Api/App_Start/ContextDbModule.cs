using Autofac;
using Microsoft.Extensions.Configuration;
using Prod.VUSP.Datos;
using Prod.VUSP.Datos.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.Core.Api.App_Start
{
    public class ContextDbModule : Autofac.Module
    {
        public static IConfiguration Configuration;

        protected override void Load(ContainerBuilder builder)
        {

            #region Base Context

            //Conexion
            string connectionString = Configuration.GetSection("ConnectionStrings:VUSPDbContext").Value;

            //Context           
            builder.RegisterType<VUSPDbContext>().Named<IDbContext>("contextVUSP").WithParameter("connstr", connectionString).InstancePerLifetimeScope();
            //Resolver UnitOfWork
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().WithParameter((c, p) => true, (c, p) => p.ResolveNamed<IDbContext>("contextVUSP"));


            //-> Aplicacion
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.VUSP.Core")))
                .Where(t => t.Name.EndsWith("Aplicacion", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsImplementedInterfaces();

            //-> Validacion
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.VUSP.Core")))
                .Where(t => t.Name.EndsWith("Validacion", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsSelf();
            //-> Proceso
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.VUSP.Core")))
                .Where(t => t.Name.EndsWith("Proceso", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsSelf();

            #endregion

            #region General Context

            ////Conexion
            //string connectionStringGeneral = Configuration.GetSection("ConnectionStrings:GENERALDbContext").Value;

            ////Context           
            //builder.RegisterType<GENERALDbContext>().Named<IDbContext>("contextGeneral").WithParameter("connstr", connectionStringGeneral).InstancePerLifetimeScope();

            ////Resolver UnitOfWork
            //builder.RegisterType<UnitOfWorkGENERAL>().As<IUnitOfWorkGENERAL>().WithParameter((c, p) => true, (c, p) => p.ResolveNamed<IDbContext>("contextGeneral"));

            #endregion


        }

    }
}
