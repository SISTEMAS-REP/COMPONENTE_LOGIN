using Prod.VUSP.Entidades.Archivo;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.VUSP.Core.Aplicacion.Interfaces.Comando
{
    public interface IArchivoService
    {
        StatusResponse<ArchivoResponse> UploadProxy(PostedFile request);
        StatusResponse<ArchivoResponse> GetFileInfo(ArchivoRequest request);
        StatusResponse<ArchivoByIdResponse[]> FilesByIds(ArchivosByIdsRequest request);
    }
}
