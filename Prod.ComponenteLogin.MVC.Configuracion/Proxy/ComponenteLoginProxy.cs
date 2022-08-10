using Prod.ComponenteLogin.Entidades;
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
            _url = string.Format("{0}ComunConsulta/", appConfig.Urls.URL_LOGIN_UNICO_API);
        }

        public StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet(ConsentimientoRequest request)
        {
            return this.CallWebApi<StatusResponse<UserInformationRequest>>(HttpMethod.Post, _url + "p_Obtener_id_usuario_extranet", this.GetJsonParameters(request));
        }
    }
}
