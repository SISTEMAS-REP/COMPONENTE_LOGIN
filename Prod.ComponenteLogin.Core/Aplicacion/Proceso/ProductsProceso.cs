using Prod.VUSP.Datos;
using Release.Helper;
using Release.Helper.Data.ICore;
using System;
//using Prod.VUSP.Entidades.Products;
using Modelo = Prod.VUSP.Datos.Modelo;
using System.Collections.Generic;
using System.Text;

namespace Prod.VUSP.Core.Aplicacion.Proceso
{
	public class ProductsProceso //: AccionGenerica<ProductsRequest>
	{
		private IContext _context;
		private IUnitOfWork _uow;

		public ProductsProceso(IUnitOfWork unitOfWork)
		{

			_uow = unitOfWork;
			_context = _uow.Context;
		}
		//protected override StatusResponse Registrar(ProductsRequest request)
		//{
		//	var sr = new StatusResponse { Success = true };

		//	//var product = new Modelo.products();

		//	//product.ProductName = request.ProductName;
		//	//product.SupplierID = request.SupplierID;
		//	//product.CategoryID = request.CategoryID;
		//	//product.QuantityPerUnit = request.QuantityPerUnit;
		//	//product.UnitPrice = request.UnitPrice;
		//	//product.UnitsInStock = request.UnitsInStock;
		//	//product.UnitsOnOrder = request.UnitsOnOrder;
		//	//product.ReorderLevel = request.ReorderLevel;
		//	//product.Discontinued = request.Discontinued;

		//	//_context.Add(product);
		//	//_uow.Save();

		//	return sr;
		//}
	}
}
