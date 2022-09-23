using Prod.LoginUnico.Application.Common;
using Prod.LoginUnico.Domain.Entities.RoleEntity;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IRoleUnitOfWork : IUnitOfWork
{
    Task<IEnumerable<RoleEntity>>
        FindRoles(RoleEntity entity);
}
