using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities.RoleEntity;
using Prod.LoginUnico.Persistence.Common;
using Prod.LoginUnico.Persistence.Context;
using Release.Helper.Data.Core;
using System.Data;

namespace Prod.LoginUnico.Persistence.Stores;

public class RoleUnitOfWork : UnitOfWork, IRoleUnitOfWork
{
    public RoleUnitOfWork(ProdDbContext context)
        : base(context)
    {

    }

    public async Task<IEnumerable<RoleEntity>>
        FindRoles(RoleEntity entity)
    {
        var parms = new Parameter[]
        {
            new Parameter("@id_rol", entity.id_rol),
            new Parameter("@id_aplicacion", entity.id_aplicacion),
            new Parameter("@tipo_rol", entity.tipo_rol),
        };

        var result = ExecuteReader<RoleEntity>(
            "usr_login_unico.MAE_ROL_BUSCAR_X_APLICACION",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }

}
