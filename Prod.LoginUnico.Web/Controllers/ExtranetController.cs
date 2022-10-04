using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Application.Features.Extranet.Commands.JuridicalCompanyInsert;
using Prod.LoginUnico.Application.Features.Extranet.Commands.NaturalPersonInsert;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordChange;

namespace Prod.LoginUnico.Web.Controllers;

public class ExtranetController : BaseApiController
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> 
        Auth([FromForm] ExtranetAuthCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        await Mediator.Send(request);

        return Ok();
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult>
        NaturalPerson([FromBody] NaturalPersonInsertCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult>
        JuridicalCompany([FromBody] JuridicalCompanyInsertCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> PasswordRecovery([FromBody] PasswordRecoveryCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> PasswordChange([FromBody] PasswordChangeCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}
