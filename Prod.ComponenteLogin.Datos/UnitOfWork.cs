using Release.Helper.Data.Core;
using System;
using System.Collections.Generic;

namespace Prod.ComponenteLogin.Datos
{
	public class UnitOfWork : BaseUnitOfWork, IUnitOfWork
	{
		public UnitOfWork(IDbContext ctx) : base(ctx, true)
		{
		}

		public IEnumerable<int> GetListId()
		{
			var ids = new List<int>();
			for (int i = 0; i < 10; i++)
			{
				ids.Add(i);
			}
			return ids;
		}
	
	}
}
