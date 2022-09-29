using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Identity.Controllers;

public class ExtranetController : BaseApiController
{
    private readonly SignInManager<ExtranetUserEntity> _signInManager;

    public ExtranetController(SignInManager<ExtranetUserEntity> signInManager)
    {
        _signInManager = signInManager;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Test()
    {
        var result = await Mediator.Send(new ExtranetAuthCommand ()
        {
            PersonType = 1,
            RucNumber = "",
            DocumentNumber = "00242465",
            Password = "produce",
            RememberMe = false,
            ReturnUrl = "",
            ApplicationId = 98,
        });

        return Ok(result);

        /*var result = await _signInManager
            .PasswordSignInAsync(
                userName: userName,
                password: password,
                isPersistent: false,
                lockoutOnFailure: true);

        return Ok(result);*/
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Auth([FromBody] ExtranetAuthCommand request)
    {
        //var result = await Mediator.Send(request);
        var userName = request.DocumentNumber!;

        if (request.PersonType == 2)
        {
            userName = $"{request.RucNumber!}{userName}";
        }

        var result = await _signInManager
            .PasswordSignInAsync(
                userName: userName,
                password: request.Password,
                isPersistent: request.RememberMe ?? false,
                lockoutOnFailure: true);

        var response = new Response<bool>()
        {
            Succeeded = result.Succeeded,
            Data = result.Succeeded
        };


        return Ok(response); //Ok(result);
    }

    /*[AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] ExtranetRegisterCommand request)
    {
        request.recaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }*/
}
