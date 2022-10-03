using Newtonsoft.Json;

namespace Prod.LoginUnico.Application.Models;

public class ReCaptchaResultModel
{
    public bool Success { get; set; }

    [JsonProperty("error-codes")]
    public string[]? ErrorCodes { get; set; }

}
