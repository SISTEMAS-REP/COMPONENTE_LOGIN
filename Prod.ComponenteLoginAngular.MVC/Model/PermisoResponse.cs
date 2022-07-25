using System;
using System.Collections.Generic;

namespace Prod.ComponenteLoginAngular.MVC.Model
{
    public class PermisoResponse
    {
        public int permiso_id { get; set; }
        public string codigo { get; set; }
        public string nombre { get; set; }
        public bool es_eliminado { get; set; }
        public string usuario_creacion { get; set; }
        public string usuario_modificacion { get; set; }
        public Nullable<System.DateTime> fecha_creacion { get; set; }
        public Nullable<System.DateTime> fecha_modificacion { get; set; }
        public virtual List<RolssaTipoPermisoResponse> rolssa_tiene_permiso { get; set; }
    }
}
