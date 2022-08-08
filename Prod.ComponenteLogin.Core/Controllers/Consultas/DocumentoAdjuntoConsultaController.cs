using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.DocumentoAdjunto;
using Release.Helper;
using Release.Helper.Pagination;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Controllers.Consultas
{
	[Route("[controller]")]
	public class DocumentoAdjuntoConsultaController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;

		public DocumentoAdjuntoConsultaController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("DocumentoAdjunto_Listar")]
		public PagedResponse<DocumentoAdjuntoResponse> DocumentoAdjunto_Listar([FromBody] DocumentoAdjuntoRequest request)
		{
			var sr = unitOfWork.p_DocumentoAdjunto_Listar(request);
			return sr;
		}
	}
}
