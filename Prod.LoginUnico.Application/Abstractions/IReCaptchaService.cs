using Prod.LoginUnico.Application.Models;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IReCaptchaService
{
    Task<ReCaptchaResultModel>
        Validate(string recaptchaToken);
}
