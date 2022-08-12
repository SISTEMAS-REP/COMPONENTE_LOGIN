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
		private readonly IUnitOfWork _unitOfWork;
		public ComponenteLoginController(IUnitOfWork unitOfWork)
		{
			this._unitOfWork = unitOfWork;
		}

		[HttpGet]
		[Route("GetApliacionesByUsuario")]
		public StatusResponse<List<AplicacionUsuarioResponse>> GetApliacionesByUsuario([FromBody] string user_name)
		{
			var sr = this._unitOfWork.GetApliacionesByUsuario(user_name);
			return sr;
		}

		[HttpPost]
		[Route("p_Obtener_id_usuario_extranet")]
		public StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet([FromBody] ConsentimientoRequest request)
		{
			StatusResponse<UserInformationRequest> response = new StatusResponse<UserInformationRequest>();
			int id_persona = request.id_persona;
			string user_name = request.user_name;
			var sr = this._unitOfWork.p_Obtener_id_usuario_extranet(id_persona, user_name);
			response.Data = sr.Data;
			response.Success = sr.Success;
			response.Messages = sr.Messages;
			return response;
		}

		[HttpGet]
		[Route("GetRolAdministradoByAplicacion")]
		public StatusResponse<RolAplicacionResponse> GetRolAdministradoByAplicacion([FromBody] string id_aplicacion)
		{
			var sr = this._unitOfWork.GetRolAdministradoByAplicacion(id_aplicacion);
			return sr;
		}
	}
}
