using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using Prod.LoginUnico.Persistence.Common;
using Prod.LoginUnico.Persistence.Context;
using Release.Helper.Data.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Persistence;

public class ExtranetUserUnitOfWork : UnitOfWork, IExtranetUserUnitOfWork
{
    public ExtranetUserUnitOfWork(ProdDbContext context)
        : base(context)
    {

    }

    public async Task<ExtranetUserEntity?> FindByEmail(string email)
    {
        var parms = new Parameter[]
        {
            new Parameter("@email", email),
        };

        var result = ExecuteReader<ExtranetUserEntity>(
            "core.MAE_USUARIO_EXTRANET_BUSCAR",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result.FirstOrDefault());
    }

    public async Task<ExtranetUserEntity?> FindByUserId(string id_usuario_extranet)
    {
        var parms = new Parameter[]
        {
            new Parameter("@id_usuario_extranet", id_usuario_extranet),
        };

        var result = ExecuteReader<ExtranetUserEntity>(
            "core.MAE_USUARIO_EXTRANET_BUSCAR",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result.FirstOrDefault());
    }

    public async Task<ExtranetUserEntity?> FindByUserName(string user_name)
    {
        var parms = new Parameter[]
        {
            new Parameter("@user_name", user_name),
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
            new Parameter("@user_name", entity.id_usuario_extranet),
            new Parameter("@user_name", entity.user_name),
            new Parameter("@user_name", entity.user_name),
            new Parameter("@user_name", entity.user_name),
            new Parameter("@user_name", entity.user_name),
            new Parameter("@user_name", entity.user_name),
            new Parameter("@user_name", entity.user_name),
        };

        var result = ExecuteScalar<int>(
            "core.MAE_USUARIO_EXTRANET_INSERTAR_ACTUALIZAR",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }
}
