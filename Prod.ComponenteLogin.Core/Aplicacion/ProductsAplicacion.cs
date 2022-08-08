using Prod.VUSP.Core.Aplicacion.Interfaces.Comando;
using Prod.VUSP.Core.Aplicacion.Proceso;
//using Prod.VUSP.Entidades.Products;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Aplicacion
{
    public class ProductsAplicacion: IProductsComandoAplicacion
    {
        private readonly ProductsProceso _productsProceso;

        public ProductsAplicacion(ProductsProceso productsProceso)
        {
            _productsProceso = productsProceso;
        }

        //public StatusResponse GuardarProducto(ProductsRequest request)
        //{
        //    var sr = new StatusResponse() { Success = true };
        //    _productsProceso.EjecutaRegistrar(request);
        //    return sr;
        //}
    }
}
