namespace Prod.ComponenteLoginAngular.MVC.Model
{
    public class RolssaTipoPermisoResponse
    {
        public int permiso_id { get; set; }
        public string identificador_ssa { get; set; }
        public virtual PermisoResponse permiso { get; set; }
    }
}
