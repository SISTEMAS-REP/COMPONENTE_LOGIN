using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Core.Aplicacion.Interfaces.Comando;
//using Prod.VUSP.Entidades.Products;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Controllers.Comandos
{
    //[ApiController]
    [Route("[controller]")]
    public class ProductsComandoController: ControllerBase
    {
        private readonly IProductsComandoAplicacion _productsComandoAplicacion;

        public ProductsComandoController(IProductsComandoAplicacion productsComandoAplicacion)
        {
            _productsComandoAplicacion = productsComandoAplicacion;
        }
        //[HttpPost]
        //[Route("Registrar")]
        //public StatusResponse Registrar([FromBody]ProductsRequest request)
        //{
        //    return _productsComandoAplicacion.GuardarProducto(request);
        //}
    }
}

