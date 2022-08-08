using Prod.VUSP.Core.Aplicacion.Interfaces.Comando;
using Prod.VUSP.Entidades.Archivo;
using Prod.VUSP.MVC.Configuracion;
using Release.Helper;
using Release.Helper.Proxy;
using System.Net.Http;
namespace Prod.VUSP.Core.Aplicacion
{
    public class ArchivoService : BaseProxy, IArchivoService
    {
        private readonly string _url;
        public ArchivoService(AppConfig settings)
        {
            _url = string.Format("{0}archivo/", settings.Urls.URL_GA_UI);
        }
        public StatusResponse<ArchivoResponse> UploadProxy(PostedFile request)
        {
            var para = this.GetJsonParameters(request);
            return this.CallWebApi<StatusResponse<ArchivoResponse>>(HttpMethod.Post, _url + "UploadProxy", para);
        }
        public StatusResponse<ArchivoResponse> GetFileInfo(ArchivoRequest request)
        {
            return this.CallWebApi<StatusResponse<ArchivoResponse>>(HttpMethod.Post, _url + "fileInfo", this.GetJsonParameters(request));
        }
        public StatusResponse<ArchivoByIdResponse[]> FilesByIds(ArchivosByIdsRequest request)
        {
            return this.CallWebApi<StatusResponse<ArchivoByIdResponse[]>>(HttpMethod.Post, _url + "filesByIds", this.GetJsonParameters(request));
        }
    }
}
