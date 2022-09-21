using Prod.LoginUnico.Application.Common;
using Prod.LoginUnico.Persistence.Context;
using Release.Helper.Data.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Persistence.Common;

public class UnitOfWork : BaseUnitOfWork, IUnitOfWork
{
    public UnitOfWork(ProdDbContext context)
        : base(context)
    {
    }
}