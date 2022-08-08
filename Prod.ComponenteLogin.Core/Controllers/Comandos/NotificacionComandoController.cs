using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Core.Aplicacion.Interfaces.Comando;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.Persona;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;
using Prod.VUSP.Entidades.Notificacion;

namespace Prod.VUSP.Core.Controllers.Comandos
{

	[Route("[controller]")]
	public class NotificacionComandoController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;

		public NotificacionComandoController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}


		[HttpPost]
		[Route("Notificacion_ActualizarEstado")]
		public StatusResponse<NotificacionResponse> Notificacion_ActualizarEstado([FromBody] NotificacionRequest request)
		{

			var sr = unitOfWork.p_Notificacion_ActualizarEstado(request);
			return sr;
		}
	}
}

