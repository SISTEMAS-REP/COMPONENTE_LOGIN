using Microsoft.EntityFrameworkCore;
using Release.Helper.Data.Core;

namespace Prod.LoginUnico.Persistence.Context;

public class ProdDbContext : DbContext, IDbContext
{
    public ProdDbContext(DbContextOptions<ProdDbContext> options)
        : base(options)
    {

    }

    public void SaveAudit()
    {
        throw new NotImplementedException();
    }

    public void SaveChanges(string jsonAuthN)
    {
        throw new NotImplementedException();
    }

    public Task SaveChangesAsync(string jsonAuthN)
    {
        throw new NotImplementedException();
    }
}
