using Release.Helper.Data.ICore;
using System;
using System.Collections.Generic;

namespace Prod.ComponenteLogin.Datos
{
	public interface IUnitOfWork : IBaseUnitOfWork
	{
		IEnumerable<int> GetListId();
	
	}
}
