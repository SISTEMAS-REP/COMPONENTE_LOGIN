﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery;
using Prod.LoginUnico.Application.Features.Extranet.Commands.VerificationPasswordRecovery;

namespace Prod.LoginUnico.Web.Controllers;

public class ExtranetController : BaseApiController
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Auth([FromForm] ExtranetAuthCommand request)
    {
        request.recaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        await Mediator.Send(request);

        return Ok();
    }
    
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] ExtranetRegisterCommand request)
    {
        request.recaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> PasswordRecovery([FromBody] ExtranetPasswordRecoveryCommand request)
    {
        request.recaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> VerificationPasswordRecovery([FromBody] ExtranetVerificationPasswordRecoveryCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}