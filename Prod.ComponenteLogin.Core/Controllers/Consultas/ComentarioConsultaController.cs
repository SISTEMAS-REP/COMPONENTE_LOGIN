using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Core.Aplicacion.Interfaces.Comando;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.Persona;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;
using Prod.ServiciosExternos;
using sep = Prod.ServiciosExternos.Personas;
using Prod.VUSP.Entidades.Comentario;

namespace Prod.VUSP.Core.Controllers.Consultas
{
	//[ApiController]
	[Route("[controller]")]
	public class ComentarioConsultaController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;

		public ComentarioConsultaController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("ListarLikeDislikePorTupa")]
		public StatusResponse<ComentarioLikeResponse> ListarLikeDislikePorTupa([FromBody] ComentarioLikeRequest request)
		{
			var sr = unitOfWork.p_Comentario_ListarLikeDislikePorTupa(request);
			return sr;
		}

	}
}

