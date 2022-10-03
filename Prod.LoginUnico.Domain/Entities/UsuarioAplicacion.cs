namespace Prod.LoginUnico.Domain.Entities;

public class UsuarioAplicacion
{
    public int id_aplicacion { get; set; }
    public string nombre { get; set; }
    public string descripcion { get; set; }
    public string url_intranet { get; set; }
    public string url_extranet { get; set; }
}
