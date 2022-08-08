using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.Flujo;
using Prod.VUSP.Entidades.Solicitud;
using Release.Helper;
using Release.Helper.Pagination;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Controllers.Consultas
{
	[Route("[controller]")]
	public class SolicitudConsultaController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;

		public SolicitudConsultaController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("Solicitud_Listar")]
		public PagedResponse<SolicitudResponse> Solicitud_Listar([FromBody] SolicitudRequest request)
		{
			var sr = unitOfWork.p_Solicitud_Listar(request);
			return sr;
		}

		[HttpPost]
		[Route("DetalleFlujoDocumentario_Listar")]
		public PagedResponse<FlujoResponse> DetalleFlujoDocumentario_Listar([FromBody] FlujoRequest request)
		{
			var sr = unitOfWork.p_DetalleFlujoDocumentario_Listar(request);
			return sr;
		}

		[HttpPost]
		[Route("Solicitud_ObtenerPorId")]
		public StatusResponse<SolicitudResponse> Solicitud_ObtenerPorId([FromBody] SolicitudRequest request)
		{
			var sr = unitOfWork.p_Solicitud_ObtenerPorId(request);
			return sr;
		}
	}
}
