using Microsoft.EntityFrameworkCore;
using Prod.VUSP.Datos.Modelo;
using Release.Helper.Data.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Datos.Contexto
{

    public partial class VUSPDbContext : DbContext, IDbContext
    {
        private readonly string _connstr;

        public VUSPDbContext(string connstr)
        {
            this._connstr = connstr;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<employees>().Ignore(x => x.territories);
        }
        public VUSPDbContext(DbContextOptions<VUSPDbContext> options)
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
        public virtual DbSet<enumerado> ENUMERADO { get; set; }
        public virtual DbSet<tipo_enumerado> TIPO_ENUMERADO { get; set; }

    }
}
