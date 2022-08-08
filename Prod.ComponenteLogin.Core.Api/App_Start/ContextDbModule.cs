using Autofac;
using Microsoft.Extensions.Configuration;
using Prod.ComponenteLogin.Datos;
using Prod.ComponenteLogin.Datos.Contexto;
using Release.Helper.Data.Core;
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
            builder.RegisterType<LoginUnicoDbContext>().Named<IDbContext>("contextLoginUnico").WithParameter("connstr", connectionString).InstancePerLifetimeScope();
            //Resolver UnitOfWork
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().WithParameter((c, p) => true, (c, p) => p.ResolveNamed<IDbContext>("contextLoginUnico"));


            //-> Aplicacion
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.ComponenteLogin.Core")))
                .Where(t => t.Name.EndsWith("Aplicacion", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsImplementedInterfaces();

            //-> Validacion
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.ComponenteLogin.Core")))
                .Where(t => t.Name.EndsWith("Validacion", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsSelf();
            //-> Proceso
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.ComponenteLogin.Core")))
                .Where(t => t.Name.EndsWith("Proceso", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsSelf();

            #endregion

        }

    }
}
