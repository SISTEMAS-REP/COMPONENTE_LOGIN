using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.ExtranetUser.Commands;

namespace Prod.LoginUnico.Web.Controllers;

public class ExternalController : BaseApiController
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Auth(ExternalAuthCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}
