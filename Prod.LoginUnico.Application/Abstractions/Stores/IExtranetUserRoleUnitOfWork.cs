using Prod.LoginUnico.Domain.Entities.ExtranetUserRoleEntity;

namespace Prod.LoginUnico.Application.Abstractions.Stores;

public interface IExtranetUserRoleUnitOfWork
{
    Task<IEnumerable<ExtranetUserRoleEntity>>
        FindExtranetUserRoles(ExtranetUserRole request);

    Task
        InsertExtranetUserRole(ExtranetUserRoleEntity entity);
}
