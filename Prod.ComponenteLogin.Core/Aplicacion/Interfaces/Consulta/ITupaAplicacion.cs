using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Aplicacion.Interfaces.Consulta
{
    public interface ITupaAplicacion
    {
        //IEnumerable<TupaResponse> GetListadoTupas(DTParameterRequest request);
        //int GetListadoTupasCount(DTParameterRequest request);
        //IEnumerable<RequisitoResponse> GetListadoRequisitosDT(DTParameterRequest request);
        //int GetListadoRequisitosCount(DTParameterRequest request);
        //List<RequisitoResponse> GetListadoRequisitos(int IdTupa);
        string GetDescripcionTupa(int IdTupa);
        int GetIdRequisitosPago(int id_solicitud);
    }
}
