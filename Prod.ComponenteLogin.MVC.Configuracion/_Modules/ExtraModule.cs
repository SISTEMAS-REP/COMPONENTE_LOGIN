using Autofac;
using Microsoft.AspNetCore.Hosting;
using Release.Helper.WebKoMvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.MVC.Configuracion._Modules
{
    public class ExtraModule : Autofac.Module
    {

        public static AppConfig AppConfig;
        public static AppSettings AppSettings;
        public static IWebHostEnvironment Environment;


        protected override void Load(ContainerBuilder builder)
        {
            BaseController.BaseConfig.Container = AppSettings.IdContainer;
            BaseController.BaseConfig.Key = AppSettings.Key?.Replace("-", "");
            BaseController.BaseConfig.WebRootPath = Environment.WebRootPath;
            //BaseController.BaseConfig.PathApp = AppSettings.PathApp;

            //BaseController.BaseConfig.Settings = new // => ns.CONFIG en el JS
            //{
            //    URL_GA_UI = AppConfig.Urls.URL_GA_UI.TrimEnd('/'),
            //    //KEY_PUBLIC_CAPTCHA_API = AppVariables.KeyPublicCaptchaApi.TrimEnd('/'),
            //};

            base.Load(builder);
        }
    }
}
