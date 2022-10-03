using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Domain.Entities;
using Prod.LoginUnico.Domain.Entities.ApplicationEntity;
using Prod.LoginUnico.Persistence.Common;
using Prod.LoginUnico.Persistence.Context;
using Release.Helper.Data.Core;
using System.Data;

namespace Prod.LoginUnico.Persistence.Stores;

public class ApplicationUnitOfWork : UnitOfWork, IApplicationUnitOfWork
{
    public ApplicationUnitOfWork(ProdDbContext context) 
        : base(context)
    {
    }

    public async Task<IEnumerable<ApplicationEntity>> 
        FindAppsByUserName(string? user_name, int? id_aplicacion)
    {
        var parms = new Parameter[]
        {
            new Parameter("@USER_NAME", user_name),
            new Parameter("@ID_APLICACION", id_aplicacion),
        };

        var result = ExecuteReader<ApplicationEntity>(
            "usr_login_unico.sp_BuscarAplicacionByUserName",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }


    public async Task<int>
        RegistrationLogSessionExtranet(bool Estado, DateTime FechaHora, int IdUsuarioExtranet, string Ip, string InformacionHost, string PcName, bool navigation_valid)
    {
        var parms = new Parameter[]
        {
            new Parameter("@id_usuario_extranet", IdUsuarioExtranet),
            new Parameter("@date_time", FechaHora),
            new Parameter("@name_host", PcName),
            new Parameter("@ip_host", Ip),
            new Parameter("@agent_host",InformacionHost),
            new Parameter("@status", Estado.ToString()),
            new Parameter("@navigation_valid", navigation_valid)
        };

        var result = ExecuteScalar<int>(
            "usr_login_unico.sp_registro_log_login_extranet",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }


    public async Task<int>
       RegisterVerificationUserExtranet(Guid identificador_solicitud, string correo_verificación, Guid codigo_verificacion)
    {
        try
        {
            var parms = new Parameter[]
            {
                new Parameter("@identificador_solicitud", identificador_solicitud),
                new Parameter("@correo_verificación", correo_verificación),
                new Parameter("@codigo_verificacion", codigo_verificacion)
            };

            var result = ExecuteScalar<decimal>(
                "usr_login_unico.SP_INS_VERIFICACION_CORREO_USUARIO_EXTRANET",
                CommandType.StoredProcedure, ref parms);
            return await Task.FromResult(Convert.ToInt32(result));
        }
        catch (Exception ex)
        {
            throw new UnauthorizedAccessException("Usuario incorrecto.");
        }

    }

    public async Task<bool>
        UpdateVerificationUserExtranet(Guid identificador_solicitud, string correo_verificación, Guid codigo_verificacion)
    {
        var parms = new Parameter[]
        {
            new Parameter("@identificador_solicitud", identificador_solicitud),
            new Parameter("@correo_verificación", correo_verificación),
            new Parameter("@codigo_verificacion", codigo_verificacion)
        };

        var result = ExecuteScalar<bool>(
            "usr_login_unico.SP_UPD_VERIFICACION_CORREO_USUARIO_EXTRANET",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }

}
