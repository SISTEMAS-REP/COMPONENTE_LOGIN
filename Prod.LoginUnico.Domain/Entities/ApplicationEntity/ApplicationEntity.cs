using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Prod.LoginUnico.Domain.Entities.ApplicationEntity;

[Table("MAE_APLICACION", Schema = "core")]
public class ApplicationEntity
{
    [Key]
    public int id_aplicacion { get; set; }

    public string nombre { get; set; }

    public string descripcion { get; set; }

    public string url_intranet { get; set; }

    public string url_extranet { get; set; }
}
