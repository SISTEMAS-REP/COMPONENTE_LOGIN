using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Domain.Entities.RoleEntity;

namespace Prod.LoginUnico.Infrastructure.Identity;

internal class RoleStore : IRoleStore<RoleEntity>
{
    private readonly IRoleUnitOfWork _roleUnitOfWork;

    public RoleStore(IRoleUnitOfWork roleUnitOfWork)
    {
        _roleUnitOfWork = roleUnitOfWork;
    }

    public Task<IdentityResult> CreateAsync(RoleEntity role, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<IdentityResult> DeleteAsync(RoleEntity role, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public void Dispose()
    {
        _roleUnitOfWork.ExecDispose();
    }

    public async Task<RoleEntity> FindByIdAsync(string roleId, CancellationToken cancellationToken)
    {
        var result = await _roleUnitOfWork.FindRoles(new()
        {
            id_rol = int.Parse(roleId),
        });

        return result.First();
    }

    public async Task<RoleEntity> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
    {
        var result = await _roleUnitOfWork.FindRoles(new()
        {
            nombre = normalizedRoleName,
        });

        return result.First();
    }

    public async Task<string> GetNormalizedRoleNameAsync(RoleEntity role, CancellationToken cancellationToken)
    {
        return await Task.FromResult(role.nombre);
    }

    public async Task<string> GetRoleIdAsync(RoleEntity role, CancellationToken cancellationToken)
    {
        return await Task.FromResult(role.id_rol.ToString());
    }

    public async Task<string> GetRoleNameAsync(RoleEntity role, CancellationToken cancellationToken)
    {
        return await Task.FromResult(role.nombre);
    }

    public Task SetNormalizedRoleNameAsync(RoleEntity role, string normalizedName, CancellationToken cancellationToken)
    {
        role.nombre = normalizedName;
        return Task.CompletedTask;
    }

    public Task SetRoleNameAsync(RoleEntity role, string roleName, CancellationToken cancellationToken)
    {
        role.nombre = roleName;
        return Task.CompletedTask;
    }

    public Task<IdentityResult> UpdateAsync(RoleEntity role, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
