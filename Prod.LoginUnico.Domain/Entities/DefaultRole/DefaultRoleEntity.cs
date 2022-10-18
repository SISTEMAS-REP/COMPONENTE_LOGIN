using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Prod.LoginUnico.Domain.Entities.DefaultRole;

[Table("CAT_ROL_DEFAULT", Schema = "core")]
public class DefaultRoleEntity
{
    [Key]
    public int id_rol_default { get; set; }

    public int id_rol { get; set; }

    public int id_aplicacion { get; set; }
}
