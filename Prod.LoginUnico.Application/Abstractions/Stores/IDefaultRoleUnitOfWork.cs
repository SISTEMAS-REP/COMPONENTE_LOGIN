using Prod.LoginUnico.Domain.Entities.DefaultRole;

namespace Prod.LoginUnico.Application.Abstractions.Stores;

public interface IDefaultRoleUnitOfWork
{
    Task<IEnumerable<DefaultRoleEntity>>
        FindExtranet(DefaultRoleEntity entity);
}
