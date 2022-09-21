using Prod.LoginUnico.Application.Common;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IExtranetUserUnitOfWork : IUnitOfWork
{
    Task<ExtranetUserEntity?> FindByEmail(string email);

    Task<ExtranetUserEntity?> FindByUserId(string id_usuario_extranet);

    Task<ExtranetUserEntity?> FindByUserName(string user_name);

    Task<int> Upsert(ExtranetUserEntity entity);
}
