using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Domain.Entities.ExtranetUserRoleEntity;
using Prod.LoginUnico.Persistence.Common;
using Prod.LoginUnico.Persistence.Context;
using Release.Helper.Data.Core;
using System.Data;

namespace Prod.LoginUnico.Persistence.Stores;

public class ExtranetUserRoleUnitOfWork : UnitOfWork, IExtranetUserRoleUnitOfWork
{
    public ExtranetUserRoleUnitOfWork(ProdDbContext context)
        : base(context)
    {

    }

    public async Task<IEnumerable<ExtranetUserRoleEntity>>
        FindExtranetUserRoles(ExtranetUserRole request)
    {
        var parms = new Parameter[]
        {
            new Parameter("@id_usuario_extranet", request.id_usuario_extranet),
            new Parameter("@id_rol", request.id_rol),
            new Parameter("@id_aplicacion", request.id_aplicacion),
        };

        var result = ExecuteReader<ExtranetUserRoleEntity>(
            "usr_login_unico.MAE_USUARIO_ROL_EXTRANET_BUSCAR",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }

    public async Task<int>
        InsertExtranetUserRole(ExtranetUserRoleEntity entity)
    {
        var parms = new Parameter[]
        {
            new Parameter("@id_usuario_extranet", entity.id_usuario_extranet),
            new Parameter("@id_rol", entity.id_rol)
        };

        var result = ExecuteScalar<int>(
            "usr_login_unico.MAE_USUARIO_ROL_EXTRANET_INSERTAR",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }
}
