using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Common.Options;

public class ReCaptcha
{
    public string SecretKey { get; set; }
    public string UrlValidator { get; set; }
}
