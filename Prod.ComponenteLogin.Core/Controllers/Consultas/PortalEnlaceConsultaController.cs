using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.PortalEnlace;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Controllers.Consultas
{
	[Route("[controller]")]
	public class PortalEnlaceConsultaController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;

		public PortalEnlaceConsultaController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("PortalEnlace_ListarPorSeccion")]
		public StatusResponse<List<PortalEnlaceResponse>> PortalEnlace_ListarPorSeccion([FromBody] PortalEnlaceRequest request)
		{
			var sr = unitOfWork.p_PortalEnlace_ListarPorSeccion(request);
			return sr;
		}
	}
}
