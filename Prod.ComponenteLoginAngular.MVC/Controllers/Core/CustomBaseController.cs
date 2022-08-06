﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Prod.ComponenteLogin.MVC.Configuracion;
using Prod.ComponenteLoginAngular.MVC.Model;
using Release.Helper.WebKoMvc.Controllers;
using System;
using System.Collections.Generic;
using Http = Microsoft.AspNetCore.Http;

namespace Prod.ComponenteLoginAngular.MVC.Controllers
{
    public class CustomBaseController : BaseController
    {
        public static Prod.Seguridad.Auth.Model.Usuario UserAuth;

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
            UserAuth = GetUser();
        }


        protected Prod.Seguridad.Auth.Model.Usuario GetUser()
        {
            var u = this.GetUserInfo<Prod.Seguridad.Auth.Model.CanjearTokenResponse>();
            return u?.Usuario;

        }

        protected Prod.Seguridad.Auth.Model.Rol[] GetRoles()
        {
            var u = this.GetUserInfo<Prod.Seguridad.Auth.Model.CanjearTokenResponse>();
            return u?.RolesUsuario;
        }

        protected string GetEncodedUser()
        {
            var user = this.GetUser();
            var JsonUser = JsonConvert.SerializeObject(user);
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(JsonUser);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    }
}
