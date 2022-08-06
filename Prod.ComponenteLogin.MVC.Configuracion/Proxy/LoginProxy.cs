using Release.Helper.Proxy;
using System;
using System.Net.Http;

namespace Prod.ComponenteLogin.MVC.Configuracion
{
	public class LoginProxy : BaseProxy
	{
		private readonly string _url;
		private readonly string _url_PV;

		public LoginProxy(AppConfig appConfig)
		{
			_url = string.Format("{0}api/", appConfig.Urls.URL_SEGURIDAD);
			_url_PV = string.Format("{0}", appConfig.Urls.URL_PRODUCE_VIRTUAL_WEB);
		}

		#region ServicioSeguridad
		public LoginResponse IniciarSesionExtranet(LoginRequest request)
		{
			return this.CallWebApi<LoginResponse>(HttpMethod.Post, _url + "Extranet/IniciarSesion", this.GetJsonParameters(request));
		}
		public LoginResponse IniciarSesionIntranet(LoginRequest request)
		{
			return this.CallWebApi<LoginResponse>(HttpMethod.Post, _url + "Intranet/IniciarSesion", this.GetJsonParameters(request));
		}
		#endregion ServicioSeguridad

		#region ServicioSeguridad
		public LoginResponse LoginExtranetPV(LoginExPVRequest request)
		{
			return this.CallWebApi<LoginResponse>(HttpMethod.Post, _url_PV + "ExtranetToken/Login", this.GetJsonParameters(request));
		}
		public LoginResponse LoginIntranetPV(LoginPVRequest request)
		{
			return this.CallWebApi<LoginResponse>(HttpMethod.Post, _url_PV + "IntranetToken/Login", this.GetJsonParameters(request));
		}
		public LoginResponse RecuperarContrasena(LoginExPVRequest request)
		{
			return this.CallWebApi<LoginResponse>(HttpMethod.Post, _url_PV + "ExtranetToken/RecuperarContrasena", this.GetJsonParameters(request));
		}
		public LoginResponse Test()
		{
			return this.CallWebApi<LoginResponse>(HttpMethod.Post, _url_PV + "ExtranetToken/Test", null);
		}
		#endregion ServicioSeguridad
	}

	public class LoginResponse
	{
		public string Datos { get; set; }
		public bool IsValido { get; set; }
		public string Mensaje { get; set; }
		public string Apellidos { get; set; }
		public string Nombres { get; set; }
		public string RazonSocial { get; set; }
		public int Id { get; set; }
	}

	public class LoginRequest
	{
		public string ruc { get; set; }
		public string dni { get; set; }
		public string numeroDocumento { get; set; }
		public string clave { get; set; }
		public string email { get; set; }
		public string id { get; set; }
	}

	public class LoginExPVRequest
	{
		public string UserName { get { return String.Format("{0}{1}", this.Ndocumento, this.Login); } }
		public string Ndocumento { get; set; }
		public string Login { get; set; }
		public bool HasLogin { get; set; }
		public string Password { get; set; }
		public bool RememberMe { get; set; }
		public int TipoPersona { get; set; }
		public string TokenCaptcha { get; set; }
		public string Email { get; set; }
		public bool Reset { get; set; }
	}

	public class LoginPVRequest
	{
		public string Login { get; set; }
		public string Password { get; set; }
		public bool RememberMe { get; set; }
		public string TokenCaptcha { get; set; }
		public string codigo_dominio { get; set; }
		public string Identificador { get; set; }
		public string Email { get; set; }
	}
}
