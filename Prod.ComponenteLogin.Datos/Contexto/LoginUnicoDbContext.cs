using Microsoft.EntityFrameworkCore;
using Release.Helper.Data.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.Datos.Contexto
{

    public partial class LoginUnicoDbContext : DbContext, IDbContext
    {
        private readonly string _connstr;

        public LoginUnicoDbContext(string connstr)
        {
            this._connstr = connstr;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<employees>().Ignore(x => x.territories);
        }
        public LoginUnicoDbContext(DbContextOptions<LoginUnicoDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!string.IsNullOrWhiteSpace(this._connstr))
            {
                optionsBuilder.UseSqlServer(this._connstr, b => b.UseRowNumberForPaging());
            }
        }

        /*Copiado Manualmente desde /MapDB/Prod.VUSP.Datos */

    }
}
