using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.Datos.Contexto
{
    public partial class LoginUnicoDbContext
    {
        public void SaveChanges(string jsonAuthN)
        {
            //TODO
        }

        public async Task SaveChangesAsync(string jsonAuthN)
        {
            //TODO
            await Task.Delay(0);
        }

        public void SaveAudit()
        {
            //TODO
        }
    }
}
