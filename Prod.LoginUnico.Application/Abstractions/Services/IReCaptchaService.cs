using Prod.LoginUnico.Application.Models;

namespace Prod.LoginUnico.Application.Abstractions.Services;

public interface IReCaptchaService
{
    Task<ReCaptchaResultModel>
        Validate(string recaptchaToken);
}
