using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Models;

public class ReCaptchaResultModel
{
    public bool Success { get; set; }

    [JsonProperty("error-codes")]
    public string[] ErrorCodes { get; set; }

}
