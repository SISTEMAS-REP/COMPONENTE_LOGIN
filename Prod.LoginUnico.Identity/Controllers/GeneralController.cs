﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.LoginUnico.Application.Features.General.Commands.Migraciones;
using Prod.LoginUnico.Application.Features.General.Commands.Reniec;
using Prod.LoginUnico.Application.Features.General.Commands.Sunat;
using Prod.LoginUnico.Application.Features.General.Queries.Logo;

namespace Prod.LoginUnico.Identity.Controllers;

public class GeneralController : BaseApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Logo([FromQuery] GeneralLogoQuery request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Sunat([FromBody] GeneralSunatCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Reniec([FromBody] GeneralReniecCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Migraciones([FromBody] GeneralMigracionesCommand request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}