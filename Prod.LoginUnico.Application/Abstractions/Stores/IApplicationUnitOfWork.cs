using Prod.LoginUnico.Application.Common.Stores;
using Prod.LoginUnico.Domain.Entities.ApplicationEntity;

namespace Prod.LoginUnico.Application.Abstractions.Stores;

public interface IApplicationUnitOfWork : IUnitOfWork
{
    Task<IEnumerable<ApplicationEntity>>
        FindAppsByUserName(string? user_name,
                           int? id_aplicacion);

    Task<int>
        RegistrationLogSessionExtranet(bool Estado,
                                       DateTime FechaHora,
                                       int IdUsuarioExtranet,
                                       string Ip,
                                       string InformacionHost,
                                       string PcName,
                                       bool navigation_valid);
    Task<int>
        RegisterVerificationUserExtranet(Guid identificador_solicitud, 
                                         string correo_verificación, 
                                         Guid codigo_verificacion);
    Task<bool>
        UpdateVerificationUserExtranet(Guid identificador_solicitud, 
                                       string correo_verificación, 
                                       Guid codigo_verificacion);
}
