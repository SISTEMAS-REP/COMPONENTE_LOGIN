using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Prod.LoginUnico.Domain.Entities.RoleEntity;

[Table("MAE_ROL", Schema = "core")]
public class RoleEntity : BaseAuditEntity
{
    [Key]
    public int id_rol { get; set; }


    public int id_aplicacion { get; set; }

    public string nombre { get; set; }

    public string tipo_rol { get; set; }

    public bool estado { get; set; }
}
