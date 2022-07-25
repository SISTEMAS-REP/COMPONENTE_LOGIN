using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Prod.ComponenteLoginAngular.MVC.Model;
using Release.Helper.WebKoMvc.Controllers;
using System;
using System.Collections.Generic;
using Http = Microsoft.AspNetCore.Http;

namespace Prod.ComponenteLoginAngular.MVC.Controllers.Core
{
    public class CustomBaseController : BaseController
    {
        public static Prod.Seguridad.Auth.Model.CanjearTokenResponse UserAuth;

        public string ActiveUserName =>
            GetUserInfo<Seguridad.Auth.Model.CanjearTokenResponse>().Usuario.UserName;

        public static List<PermisoResponse> UserPermisos;

        //public override void OnActionExecuted(ActionExecutedContext filterContext)
        //{
        //    base.OnActionExecuted(filterContext);
        //    UserAuth = GetUser();
        //    UserPermisos = GetPermisos();
        //}

        protected ActionResult _Response(Object data = null, int statuscode = Http.StatusCodes.Status200OK, string msg = null, Object errors = null)
        {
            var response = new
            {
                statuscode,
                msg,
                data,
                errors
            };
            Response.StatusCode = statuscode;

            return new JsonResult(response);
        }

        protected string GetEncodedConfig(AppConfig appConfig)
        {
            var JsonConfig = JsonConvert.SerializeObject(appConfig);
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(JsonConfig);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        protected string GetEncodedFileConfig(FileSettings fileSetting)
        {
            var JsonConfig = JsonConvert.SerializeObject(fileSetting);
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(JsonConfig);
            return System.Convert.ToBase64String(plainTextBytes);
        }


        protected Prod.Seguridad.Auth.Model.CanjearTokenResponse GetUser()
        {
            var u = this.GetUserInfo<Prod.Seguridad.Auth.Model.CanjearTokenResponse>();
            return u;
        }

        protected List<PermisoResponse> GetPermisos()
        {
            return null;
        }

        protected string GetEncoded(object _object)
        {
            var JsonUser = JsonConvert.SerializeObject(_object);
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(JsonUser);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public void SetAuditoria(object request)
        {
            var myType = request.GetType();

            var pinfo = myType.GetProperty("usuario_creacion");
            if (pinfo != null) pinfo.SetValue(request, ActiveUserName, null);

            var pinfo2 = myType.GetProperty("usuario_modificacion");
            if (pinfo2 != null) pinfo2.SetValue(request, ActiveUserName, null);

            var pinfo3 = myType.GetProperty("fecha_creacion");
            if (pinfo3 != null) pinfo3.SetValue(request, DateTime.Now, null);

            var pinfo4 = myType.GetProperty("fecha_modificacion");
            if (pinfo4 != null) pinfo4.SetValue(request, DateTime.Now, null);
        }

        public void SetAuditoria(IEnumerable<object> requests)
        {
            foreach (var request in requests)
            {
                var myType = request.GetType();

                var pinfo = myType.GetProperty("usuario_creacion");
                if (pinfo != null) pinfo.SetValue(request, ActiveUserName, null);

                var pinfo2 = myType.GetProperty("usuario_modificacion");
                if (pinfo2 != null) pinfo2.SetValue(request, ActiveUserName, null);

                var pinfo3 = myType.GetProperty("fecha_creacion");
                if (pinfo3 != null) pinfo3.SetValue(request, DateTime.Now, null);

                var pinfo4 = myType.GetProperty("fecha_modificacion");
                if (pinfo4 != null) pinfo4.SetValue(request, DateTime.Now, null);
            }
        }

        public class AppConfig
        {
            public Urls Urls { get; set; }
            public MyReportConfig MyReportConfig { get; set; }
            public MySecurityConfig MySecurityConfig { get; set; }
        }
        public class MySecurityConfig
        {
            public int IdApp { get; set; }
        }

        public class Urls
        {
            public string URL_GA_UI { get; set; }
            public string URL_Arquetipo_Core_API { get; set; }
            public string URL_RENIEC_API { get; set; }
            public string URL_SUNAT_API { get; set; }
            public string URL_UBIGEO { get; set; }
            public string URL_CORREO_API { get; set; }
            public string URL_ANIO_API { get; set; }
            public string URL_PDF { get; set; }
            public string URL_ST_GENERAL { get; set; }
            public string URL_ST_PRODUCE_VIRTUAL { get; set; }
        }

        public class MyReportConfig
        {
            public string UrlReportServer { get; set; }
            public string User { get; set; }
            public string Password { get; set; }
            public string Domain { get; set; }
            public string ReportFolder { get; set; }

        }

    }
}
