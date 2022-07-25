using System.Collections.Generic;

namespace Prod.ComponenteLoginAngular.MVC.Model
{
    public class FileSettings
    {
        public int PesoMaximoMB { get; set; }
        public List<string> Extensiones { get; set; }
        public int MaxVersionArchivoHistorico { get; set; }
    }
}
