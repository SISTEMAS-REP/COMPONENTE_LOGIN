using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.Auth.Commands.AuthExtranet;
using Prod.LoginUnico.Application.Features.Auth.Queries;

namespace Prod.LoginUnico.Web.Controllers;

public class AuthController : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("extranet")]
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<IActionResult>
        AuthExtranet([FromForm] AuthExtranetCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        await Mediator.Send(request);

        return Ok();
    }

    [HttpGet("check")]
    public async Task<IActionResult>
        Check()
    {
        var result = await Mediator.Send(new AuthCheckQuery());
        return Ok(result);
    }
}
