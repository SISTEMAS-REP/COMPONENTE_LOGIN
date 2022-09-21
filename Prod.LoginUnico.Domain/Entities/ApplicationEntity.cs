using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Prod.LoginUnico.Domain.Entities;

[Table("MAE_APLICACION", Schema = "core")]
public class ApplicationEntity
{
    [Key]
    public int id_aplicacion { get; set; }
}
