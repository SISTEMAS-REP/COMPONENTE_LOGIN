
using Prod.ComponenteLogin.Entidades;
using Prod.ComponenteLogin.Entidades.AplicacionUsuario;
using Release.Helper;
using Release.Helper.Data.Core;
using System;
using System.Collections.Generic;
using System.Data;

namespace Prod.ComponenteLogin.Datos
{
	public class UnitOfWork : BaseUnitOfWork, IUnitOfWork
	{
		public UnitOfWork(IDbContext ctx) : base(ctx, true)
		{
		}

		public IEnumerable<int> GetListId()
		{
			var ids = new List<int>();
			for (int i = 0; i < 10; i++)
			{
				ids.Add(i);
			}
			return ids;
		}
		public StatusResponse<List<AplicacionUsuarioResponse>> GetApliacionesByUsuario(string user_name)
        {
            StatusResponse<List<AplicacionUsuarioResponse>> sr = new StatusResponse<List<AplicacionUsuarioResponse>>();
            try
            {
                var param = new Parameter[]{
                    new Parameter("@USERNAME",user_name),
                };
                var data = this.ExecuteReader<AplicacionUsuarioResponse>("transaccional.p_Obtener_Datos_Aplicacion_By_Usuario", CommandType.StoredProcedure, ref param);
                if (data != null)
                {
                    sr.Success = true;
                    //sr.Data = data;
                    sr.Messages.Add("Se obtuvo correctamente");
                }
                else
                {
                    sr.Messages.Add("Ocurrio un error");
                }
            }
            catch (Exception ex)
            {
                sr.Success = false;
                sr.Messages.Add("Ocurrio un error" + ex.Message);
            }
            return sr;
        }
		public StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet(int id_persona, string user_name)
		{
			StatusResponse<UserInformationRequest> sr = new StatusResponse<UserInformationRequest>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_PERSONA",id_persona),
					new Parameter("@USER_NAME",user_name)
				};
				var data = this.ExecuteReader<UserInformationRequest>("transaccional.p_Obtener_id_usuario_extranet", CommandType.StoredProcedure, ref param);
				if (data != null)
				{
					sr.Success = true;
					//sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

	}
}
