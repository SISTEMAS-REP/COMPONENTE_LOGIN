using Prod.LoginUnico.Application.Common.Stores;
using Prod.LoginUnico.Persistence.Context;
using Release.Helper.Data.Core;

namespace Prod.LoginUnico.Persistence.Common;

public class UnitOfWork : BaseUnitOfWork, IUnitOfWork
{
    public UnitOfWork(ProdDbContext context)
        : base(context)
    {
    }

    public void ExecDispose()
    {
        Dispose();
    }
}