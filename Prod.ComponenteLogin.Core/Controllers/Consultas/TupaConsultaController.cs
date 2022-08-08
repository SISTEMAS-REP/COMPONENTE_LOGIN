using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.ServicioTramite;
using Prod.VUSP.Entidades.Tupa;
using Release.Helper;
using Release.Helper.Pagination;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Controllers.Consultas
{
	[Route("[controller]")]
	public class TupaConsultaController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;

		public TupaConsultaController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("Tupa_ObtenerPorId")]
		public StatusResponse<TupaResponse> Tupa_ObtenerPorId([FromBody] TupaRequest request)
		{
			var sr = unitOfWork.p_Tupa_ObtenerPorId(request);
			return sr;
		}

		[HttpPost]
		[Route("Tupa_ListarPorClaseSector")]
		public PagedResponse<TupaResponse> Tupa_ListarPorClaseSector([FromBody] TupaRequest request)
		{
			var sr = unitOfWork.p_Tupa_ListarPorClaseSector(request);
			return sr;
		}

		[HttpPost]
		[Route("Tupa_Listar")]
		public PagedResponse<TupaResponse> Tupa_Listar([FromBody] TupaRequest request)
		{
			var sr = unitOfWork.p_Tupa_Listar(request);
			return sr;
		}

		[HttpPost]
		[Route("Servicio_tramite_list_by_dependencia")]
		public PagedResponse<ServicioTramiteResponse> Servicio_tramite_list_by_dependencia([FromBody] ServicioTramiteRequest request)
		{
			var sr = unitOfWork.p_servicio_tramite_list_by_dependencia(request);
			return sr;
		}
	}
}
