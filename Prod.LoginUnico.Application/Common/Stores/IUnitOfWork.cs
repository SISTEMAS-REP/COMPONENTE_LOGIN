using Release.Helper.Data.ICore;

namespace Prod.LoginUnico.Application.Common.Stores;

public interface IUnitOfWork : IBaseUnitOfWork
{
    void ExecDispose();
}