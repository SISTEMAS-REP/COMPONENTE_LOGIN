using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities;
using Prod.LoginUnico.Domain.Entities.ApplicationEntity;
using Prod.LoginUnico.Domain.Entities.CheckEmailEntity;
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
        FindAppsByUserName(string user_name, int id_aplicacion)
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

    public async Task<IEnumerable<CheckEmailEntity>>
        CheckEmailUserExtranet(Guid identificador_solicitud, string correo_verificación)
    {
        var parms = new Parameter[]
        {
            new Parameter("@identificador_solicitud", identificador_solicitud),
            new Parameter("@correo_verificación", correo_verificación)
        };

        var result = ExecuteReader<CheckEmailEntity>(
            "usr_login_unico.SP_VERIFICAR_CORREO_USUARIO_EXTRANET",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }

    public async Task<int>
        RegisterEmailUserExtranet(Guid identificador_solicitud, string correo_verificación, Guid codigo_verificacion)
    {
        var parms = new Parameter[]
        {
            new Parameter("@identificador_solicitud", identificador_solicitud),
            new Parameter("@correo_verificación", correo_verificación),
            new Parameter("@codigo_verificacion", codigo_verificacion)
        };

        var result = ExecuteScalar<int>(
            "usr_login_unico.SP_INSERTAR_CORREO_USUARIO_EXTRANET",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }
}
