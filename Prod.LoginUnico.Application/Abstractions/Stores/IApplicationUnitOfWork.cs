using Prod.LoginUnico.Application.Common.Stores;
using Prod.LoginUnico.Application.Features.Extranet.Commands.ApplicationsUserList;
using Prod.LoginUnico.Domain.Entities.ApplicationEntity;

namespace Prod.LoginUnico.Application.Abstractions.Stores;

public interface IApplicationUnitOfWork : IUnitOfWork
{
    Task<IEnumerable<ApplicationEntity>>FindAppsByUserName(string? user_name, int? id_aplicacion);
    Task<int>RegistrationLogSessionExtranet(bool Estado, DateTime FechaHora, int IdUsuarioExtranet, string Ip, string InformacionHost, string PcName, bool navigation_valid);
    Task<string> ActualizarPassword(string user_name, byte[] password_hash);
    Task<List<ApplicationUserResponse>> GetListApplicationByUser(string user_name);
    Task<int> SP_INS_UPD_VERIFICACION_RECUPERACION_PASSWORD(Guid identificador, string correo, int verificado);
    Task<bool> SP_SEL_VERIFICACION_RECUPERACION_PASSWORD(Guid identificador);
}
