using Prod.LoginUnico.Domain.Entities.ExtranetUserRoleEntity;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IExtranetUserRoleUnitOfWork
{
    Task<IEnumerable<ExtranetUserRoleEntity>>
        FindExtranetUserRoles(ExtranetUserRole request);
}
