using Prod.ComponenteLogin.Entidades;
using Prod.ComponenteLogin.Entidades.AplicacionUsuario;
using Release.Helper;
using Release.Helper.Data.ICore;
using System;
using System.Collections.Generic;

namespace Prod.ComponenteLogin.Datos
{
	public interface IUnitOfWork : IBaseUnitOfWork
	{
		IEnumerable<int> GetListId();
		StatusResponse<List<AplicacionUsuarioResponse>> GetApliacionesByUsuario(string user_name);
		StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet(int id_persona, string user_name);
		StatusResponse<RolAplicacionResponse> GetRolAdministradoByAplicacion(string id_aplicacion);
	}
}
