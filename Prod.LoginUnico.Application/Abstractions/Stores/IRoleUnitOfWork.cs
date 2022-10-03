using Prod.LoginUnico.Application.Common.Stores;
using Prod.LoginUnico.Domain.Entities.RoleEntity;

namespace Prod.LoginUnico.Application.Abstractions.Stores;

public interface IRoleUnitOfWork : IUnitOfWork
{
    Task<IEnumerable<RoleEntity>>
        FindRoles(RoleEntity entity);
}
