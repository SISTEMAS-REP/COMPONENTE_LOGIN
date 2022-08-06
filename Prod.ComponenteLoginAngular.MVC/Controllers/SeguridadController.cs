using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.ComponenteLoginAngular.MVC.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prod.ComponenteLoginAngular.MVC.Controllers
{
    [Route("[controller]")]
    public class SeguridadController : CustomBaseController
    {
		public SeguridadController()
		{
			
		}

		[AllowAnonymous]
		[HttpGet]
		[Route("Recovery")]
		public IActionResult Recovery([FromQuery] string Identificador, [FromQuery] string Code, [FromQuery] string Email, [FromQuery] string UserName)
		{
			//var user = this.GetUser();
			ViewBag.IsAuthenticated = false;
			if (User.Identity.IsAuthenticated)
			{
				ViewBag.IsAuthenticated = true;
			}
			ViewBag.Opc = "RC";
			return View();
		}

	}
}
