using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Domain.Entities;

[Table("MAE_USUARIO_ROL_EXTRANET", Schema = "core")]
public class ExtranetUserRoleEntity
{
    public int id_usuario_extranet { get; set; }
    public int id_rol { get; set; }
}
