using Prod.LoginUnico.Application.Abstractions;
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
}
