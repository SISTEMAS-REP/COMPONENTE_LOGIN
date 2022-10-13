using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordChange;
using Prod.LoginUnico.Application.Features.Extranet.Commands.ApplicationsUserList;

namespace Prod.LoginUnico.Web.Controllers;

public class ExtranetController : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("auth")]
    [Consumes("application/x-www-form-urlencoded")]
    public async Task<IActionResult> 
        Auth([FromForm] ExtranetAuthCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        await Mediator.Send(request);

        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("passwordrecovery")]
    public async Task<IActionResult> PasswordRecovery([FromBody] PasswordRecoveryCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("passwordchange")]
    public async Task<IActionResult> PasswordChange([FromBody] PasswordChangeCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("applicationsuserlist")]
    public async Task<IActionResult> ApplicationsUserList([FromBody] ApplicationsUserListCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}
