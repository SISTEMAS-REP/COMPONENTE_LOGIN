using Prod.LoginUnico.Application.Common.Stores;
using Prod.LoginUnico.Domain.Entities;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Abstractions.Stores;

public interface IExtranetUserUnitOfWork : IUnitOfWork
{
    Task<ExtranetUserEntity?>
        FindExtranetUser(int? extranetUserId = null,
                         string? userName = null,
                         string? email = null);

    Task<int> 
        Upsert(ExtranetUserEntity entity);

    Task<UsuarioAplicacion?> 
        BuscarAplicacionByUserName(string user_name,
                                   int id_aplicacion);
}
