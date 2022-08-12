using Prod.ComponenteLogin.Entidades;
using Prod.ComponenteLogin.Entidades.AplicacionUsuario;
using Release.Helper;
using Release.Helper.Proxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.MVC.Configuracion.Proxy
{
    public class ComponenteLoginProxy : BaseProxy
    {
        private readonly string _url;

        public ComponenteLoginProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}ComponenteLogin/", appConfig.Urls.URL_LOGIN_UNICO_API);
        }

        public StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet(ConsentimientoRequest request)
        {
            return this.CallWebApi<StatusResponse<UserInformationRequest>>(HttpMethod.Post, _url + "p_Obtener_id_usuario_extranet", this.GetJsonParameters(request));
        }
        public StatusResponse<List<AplicacionUsuarioResponse>> GetApliacionesByUsuario(string user_name)
        {
            return this.CallWebApi<StatusResponse<List<AplicacionUsuarioResponse>>>(HttpMethod.Get, _url + "GetApliacionesByUsuario", this.GetJsonParameters(user_name));
        }
        public StatusResponse<RolAplicacionResponse> GetRolAdministradoByAplicacion(string id_aplicacion)
        {
            return this.CallWebApi<StatusResponse<RolAplicacionResponse>>(HttpMethod.Get, _url + "GetRolAdministradoByAplicacion", this.GetJsonParameters(id_aplicacion));
        }
    }
}
