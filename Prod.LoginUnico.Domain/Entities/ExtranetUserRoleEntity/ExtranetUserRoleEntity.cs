using System.ComponentModel.DataAnnotations.Schema;

namespace Prod.LoginUnico.Domain.Entities.ExtranetUserRoleEntity;

[Table("MAE_USUARIO_ROL_EXTRANET", Schema = "core")]
public class ExtranetUserRoleEntity
{
    public int id_usuario_extranet { get; set; }
    public int id_rol { get; set; }
}
