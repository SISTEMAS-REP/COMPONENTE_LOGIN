using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Domain.Entities.ExtranetUser;

public class ExtranetUser : ExtranetUserEntity
{
    public string nro_documento { get; set; }

    public string apellidos { get; set; }

    public string nombres { get; set; }
}
