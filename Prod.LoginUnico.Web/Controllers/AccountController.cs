using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.Account.Queries.GetExtranetAccount;
using Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;
using Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetPersonAccount;
using Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccount;
using Prod.LoginUnico.Application.Features.Account.Queries.GetExtranetCompanyAccountUsers;
using Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccountUser;
using Prod.LoginUnico.Application.Features.Account.Commands.ValidateCurrentPassword;
using Prod.LoginUnico.Application.Features.Account.Commands.ModificationPasswordCompany;
using Prod.LoginUnico.Application.Features.Extranet.Commands.ApplicationsUserList;

namespace Prod.LoginUnico.Web.Controllers;

public class AccountController : BaseApiController
{
    [HttpGet("extranet")]
    public async Task<IActionResult>
        GetExtranetAccount()
    {
        var result = await Mediator.Send(new GetExtranetAccountQuery());
        return Ok(result);
    }

    [HttpPut("extranet")]
    public async Task<IActionResult>
        UpdateExtranetAccount([FromBody] UpdateExtranetAccountCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("extranet/person")]
    public async Task<IActionResult>
        InsertExtranetPersonAccount([FromBody] InsertExtranetPersonAccountCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("extranet/company")]
    public async Task<IActionResult>
        InsertExtranetCompanyAccount([FromBody] InsertExtranetCompanyAccountCommand request)
    {
        request.RecaptchaToken = HttpContext.Request.Headers["x-captcha-token"];
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [HttpGet("extranet/company/users")]
    public async Task<IActionResult>
        GetExtranetCompanyAccountUsers()
    {
         var result = await Mediator.Send(new GetExtranetCompanyAccountUsersQuery());
        return Ok(result);
    }

    [HttpPost("extranet/company/users")]
    public async Task<IActionResult>
        InsertExtranetCompanyAccountUsers([FromBody] InsertExtranetCompanyAccountUserCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [HttpPut("extranet/company/users/{userId}")]
    public async Task<IActionResult>
        UpdateExtranetCompanyAccountUser(int userId, [FromBody] UpdateExtranetCompanyAccountUserCommand request)
    {
        request.UserId = userId;
        var result = await Mediator.Send(request);
        return Ok(result);
    }



    [AllowAnonymous]
    [HttpPost("validateCurrentPassword")]
    public async Task<IActionResult>
       ValidateCurrentPassword([FromBody] ValidateCurrentPasswordCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("modificationPasswordCompany")]
    public async Task<IActionResult>
        ModificationPasswordCompany([FromBody] ModificationPasswordCompanyCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("applicationsuserlist")]
    public async Task<IActionResult> ApplicationsUserList([FromBody] ApplicationsUserListCommand request)
    {     
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}
