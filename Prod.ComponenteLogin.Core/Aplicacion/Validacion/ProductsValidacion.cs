using Prod.VUSP.Datos;
//using Prod.VUSP.Entidades.Products;
using Release.Helper;
using Release.Helper.Data.ICore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Aplicacion.Validacion
{
    public class ProductsValidacion: ValidacionGenerica
    {
        private IContext _context;
        private IUnitOfWork _uow;

        public ProductsValidacion(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
            _context = _uow.Context;
        }

        //public List<string> ValidarProducto(ProductsRequest request)
        //{

        //    return Msg;
        //}
    }
}
