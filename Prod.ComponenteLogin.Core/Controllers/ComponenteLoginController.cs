using Microsoft.AspNetCore.Mvc;
using Prod.ComponenteLogin.Datos;
using Prod.ComponenteLogin.Entidades;
using Prod.ComponenteLogin.Entidades.AplicacionUsuario;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.Core.Controllers
{
    [Route("[controller]")]
    public class ComponenteLoginController : ControllerBase
    {
		private readonly IUnitOfWork unitOfWork;
		public ComponenteLoginController(IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
		}

		[HttpGet]
		[Route("GetApliacionesByUsuario")]
		public StatusResponse<List<AplicacionUsuarioResponse>> GetApliacionesByUsuario([FromBody] string user_name)
		{
			var sr = unitOfWork.GetApliacionesByUsuario(user_name);
			return sr;
		}

		[HttpPost]
		[Route("p_Obtener_id_usuario_extranet")]
		public StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet([FromBody] ConsentimientoRequest request)
		{
			StatusResponse<UserInformationRequest> response = new StatusResponse<UserInformationRequest>();
			int id_persona = request.id_persona;
			string user_name = request.user_name;
			var sr = unitOfWork.p_Obtener_id_usuario_extranet(id_persona, user_name);
			response.Data = sr.Data;
			response.Success = sr.Success;
			response.Messages = sr.Messages;
			return response;
		}
	}
}
