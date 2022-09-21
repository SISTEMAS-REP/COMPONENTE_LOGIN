using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Models;

public class Token
{
    public string AccessToken { get; set; }

    public DateTime ExpiresAt { get; set; }

    public bool TokenExpired
    {
        get
        {
            return ExpiresAt.AddSeconds(-60).ToUniversalTime() <= DateTime.UtcNow;
        }
    }
}
