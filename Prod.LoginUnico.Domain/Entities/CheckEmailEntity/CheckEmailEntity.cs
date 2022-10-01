using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Domain.Entities.CheckEmailEntity
{
    [Table("DAT_VERIFICACION_CORREO", Schema = "solicitudes")]

    public class CheckEmailEntity
    {
        [Key]
        public int id { get; set; }
        public Guid identificador_solicitud { get; set; }
        public string correo_verificación { get; set; }
        public Guid codigo_verificacion { get; set; }
        public DateTime fecha_solicitud { get; set; }
        public bool verificado { get; set; }
    }
}
