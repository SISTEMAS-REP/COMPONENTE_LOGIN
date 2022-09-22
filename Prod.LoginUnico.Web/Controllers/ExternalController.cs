using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.External.Commands.Auth;
using Prod.LoginUnico.Application.Features.External.Queries.Logo;

namespace Prod.LoginUnico.Web.Controllers;

public class ExternalController : BaseApiController
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Auth([FromBody] ExternalAuthCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Logo([FromBody] ExternalLogoQuery request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}
