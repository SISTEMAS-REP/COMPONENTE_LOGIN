using System.ComponentModel.DataAnnotations.Schema;

namespace Prod.LoginUnico.Domain.Entities.DefaultRoleEntity;

[Table("CAT_ROL_DEFAULT", Schema = "core")]
public class DefaultRoleEntity
{
    public int id_rol_default { get; set; }

    public int id_aplicacion { get; set; }
    //public string? nombre_aplicacion { get; set; }

    public int id_rol { get; set; }
    //public string? nombre_rol { get; set; }

    public bool flag { get; set; }

    public string tipo { get; set; }

    public int acceso_tipo_persona { get; set; }
}