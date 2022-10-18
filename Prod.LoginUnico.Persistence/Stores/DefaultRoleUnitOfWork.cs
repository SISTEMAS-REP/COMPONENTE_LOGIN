using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Domain.Entities.DefaultRole;
using Prod.LoginUnico.Persistence.Common;
using Prod.LoginUnico.Persistence.Context;
using Release.Helper.Data.Core;
using System.Data;

namespace Prod.LoginUnico.Persistence.Stores;

public class DefaultRoleUnitOfWork : UnitOfWork, IDefaultRoleUnitOfWork
{
    public DefaultRoleUnitOfWork(ProdDbContext context)
        : base(context)
    {

    }

    public async Task<IEnumerable<DefaultRoleEntity>>
        FindExtranet(DefaultRoleEntity entity)
    {
        var parms = new Parameter[]
        {
            new Parameter("@id_aplicacion", entity.id_aplicacion)
        };

        var result = ExecuteReader<DefaultRoleEntity>(
            "usr_login_unico.CAT_ROL_DEFAULT_EXTRANET_LISTAR",
            CommandType.StoredProcedure, ref parms);

        return await Task.FromResult(result);
    }

}
