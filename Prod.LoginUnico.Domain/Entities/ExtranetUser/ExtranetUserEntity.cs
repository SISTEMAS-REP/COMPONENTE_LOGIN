using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Domain.Entities.ExtranetUser;

[Table("MAE_USUARIO_EXTRANET", Schema = "core")]
public class ExtranetUserEntity
{
    [Key]
    public int id_usuario_extranet { get; set; }

    
    public int id_persona_natural { get; set; }

    public int id_persona_juridica { get; set; }

    public string user_name { get; set; }

    public byte[] password_hash { get; set; }

    public byte[] security_stamp { get; set; }

    public string email { get; set; }

    public bool email_confirmed { get; set; }

    public string phone_number { get; set; }

    public bool phone_number_confirmed { get; set; }

    public bool two_factor_enabled { get; set; }

    public DateTime? lockout_end_date { get; set; }

    public bool lockout_enable { get; set; }

    public int access_failed_count { get; set; }

    public int id_contacto_extranet { get; set; }

    public string usuario_registro { get; set; }

    public DateTime? fecha_registro { get; set; }

    public string usuario_modificacion { get; set; }

    public DateTime fecha_modificacion { get; set; }

    public int idsector { get; set; }

    public bool Activo { get; set; }
}
