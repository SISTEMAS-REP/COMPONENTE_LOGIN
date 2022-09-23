using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Application.Features.Extranet.Queries.Logo;

namespace Prod.LoginUnico.Web.Controllers;

public class ExtranetController : BaseApiController
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Auth([FromBody] ExtranetAuthCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Logo([FromBody] ExtranetLogoQuery request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}
