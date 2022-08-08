using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.TupaRequisito;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Controllers.Consultas
{
	[Route("[controller]")]
	public class TupaRequisitoConsultaController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;

		public TupaRequisitoConsultaController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("TupaRequisito_Listar")]
		public StatusResponse<List<TupaRequisitoResponse>> TupaRequisito_Listar([FromBody] TupaRequisitoRequest request)
		{
			var sr = unitOfWork.p_TupaRequisito_Listar(request);
			return sr;
		}
	}
}
