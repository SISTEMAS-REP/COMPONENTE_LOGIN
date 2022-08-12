using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.Entidades
{
    public class RolAplicacionResponse
    {
        public int id_aplicacion { get; set; }
        public string nombre_aplicacion { get; set; }
        public int id_rol { get; set; }
        public string nombre_rol { get; set; }
    }
}
