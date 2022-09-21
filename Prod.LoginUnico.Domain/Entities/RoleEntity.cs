using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Domain.Entities;

[Table("MAE_ROL", Schema = "core")]
public class RoleEntity
{
    [Key]
    public int id_rol { get; set; }

    public int id_aplicacion { get; set; }
}
