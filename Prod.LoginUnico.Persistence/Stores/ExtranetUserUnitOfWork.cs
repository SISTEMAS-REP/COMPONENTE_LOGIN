using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using Prod.LoginUnico.Persistence.Common;
using Prod.LoginUnico.Persistence.Context;
using Release.Helper.Data.Core;
using System.Data;

namespace Prod.LoginUnico.Persistence.Stores;

public class ExtranetUserUnitOfWork : UnitOfWork, IExtranetUserUnitOfWork
{
    public ExtranetUserUnitOfWork(ProdDbContext context)
        : base(context)
    {
    }

    public async Task<ExtranetUserEntity?> FindExtranetUser(
        int? extranetUserId,
        string? userName,
        string? email)
    {
        var parms = new Parameter[]
        {
            new Parameter("@id_usuario_extranet", extranetUserId),
            new Parameter("@user_name", userName),
            new Parameter("@email", email),
        };

        var result = ExecuteReader<ExtranetUserEntity>(
            "core.MAE_USUARIO_EXTRANET_BUSCAR",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result.FirstOrDefault());
    }

    public async Task<int> Upsert(ExtranetUserEntity entity)
    {
        var parms = new Parameter[]
        {
            new Parameter("@id_usuario_extranet", entity.id_usuario_extranet),
            new Parameter("@id_persona_natural", entity.id_persona_natural),
            new Parameter("@id_persona_juridica", entity.id_persona_juridica),
            new Parameter("@user_name", entity.user_name),
            new Parameter("@password_hash", entity.password_hash),
            new Parameter("@security_stamp", entity.security_stamp),
            new Parameter("@email", entity.email),
            new Parameter("@email_confirmed", entity.email_confirmed),
            new Parameter("@phone_number", entity.phone_number),
            new Parameter("@phone_number_confirmed", entity.phone_number_confirmed),
            new Parameter("two_factor_enabled", entity.two_factor_enabled),
            new Parameter("@lockout_end_date", entity.lockout_end_date),
            new Parameter("@lockout_enable", entity.lockout_enable),
            new Parameter("@access_failed_count", entity.access_failed_count),
            //new Parameter("@id_contacto_extranet", entity.id_contacto_extranet),
            new Parameter("@usuario_registro", entity.usuario_registro),
            new Parameter("@fecha_registro", entity.fecha_registro),
            new Parameter("@usuario_modificacion", entity.usuario_modificacion),
            new Parameter("@fecha_modificacion", entity.fecha_modificacion),
            new Parameter("@idsector", entity.idsector),
            new Parameter("@Activo", entity.Activo),
        };

        var result = ExecuteScalar<int>(
            "core.MAE_USUARIO_EXTRANET_INSERTAR_ACTUALIZAR",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }

    public async Task<UsuarioAplicacion?> BuscarAplicacionByUserName(string user_name, int id_aplicacion)
    {
        var parms = new Parameter[]
        {
            new Parameter("@USER_NAME", user_name),
            new Parameter("@ID_APLICACION", id_aplicacion),
        };

        var result = ExecuteReader<UsuarioAplicacion>(
            "usr_login_unico.sp_BuscarAplicacionByUserName",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result.FirstOrDefault());
    }
}
