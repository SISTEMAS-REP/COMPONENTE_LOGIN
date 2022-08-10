using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.Entidades
{
    public class ConsentimientoRequest
    {
        public string user_name { get; set; }
        public int id_persona { get; set; }
        public int id_usuario_extranet { get; set; }
        public bool tiene_domicilio { get; set; }
        public bool respuesta_aviso { get; set; }
        public string ruc { get; set; }
        public string dni { get; set; }
        public string correo_electronico { get; set; }
        public string telefono { get; set; }
        public string codigo_departamento { get; set; }
        public string codigo_provincia { get; set; }
        public string codigo_distrito { get; set; }
        public string direccion { get; set; }
        public bool es_persona_juridica { get; set; }
        public DateTime? fecha_registro { get; set; }
    }
}
