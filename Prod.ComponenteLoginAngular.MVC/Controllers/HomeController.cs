using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Prod.ComponenteLoginAngular.MVC.Controllers.Core;
using Prod.ComponenteLoginAngular.MVC.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Prod.ComponenteLoginAngular.MVC.Controllers
{
    public class HomeController : CustomBaseController
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

		[AllowAnonymous]
		public IActionResult Index()
		{
			//var user = this.GetUser();
			ViewBag.IsAuthenticated = false;
			if (User.Identity.IsAuthenticated)
			{
				ViewBag.IsAuthenticated = true;
			}
			return View();
		}

		public IActionResult Privacy(string opc)
		{
			ViewBag.IsAuthenticated = false;
			if (User.Identity.IsAuthenticated)
			{
				ViewBag.IsAuthenticated = true;
			}
			ViewBag.Opc = opc;
			return View("Index");
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
