using Prod.VUSP.Core.Aplicacion.Interfaces.Consulta;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Aplicacion
{
    public class ComunAplicacion : IComunAplicacion
    {

        public string GetFullName()
        {
            return "Alex Santiago Clemente";
        }
    }
}
