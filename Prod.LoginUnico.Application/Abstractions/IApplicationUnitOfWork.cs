using Prod.LoginUnico.Application.Common;
using Prod.LoginUnico.Domain.Entities.ApplicationEntity;
using Prod.LoginUnico.Domain.Entities.CheckEmailEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IApplicationUnitOfWork : IUnitOfWork
{
    Task<IEnumerable<ApplicationEntity>>
        FindAppsByUserName(string user_name, int id_aplicacion);
    Task<int>
        RegistrationLogSessionExtranet(bool Estado, DateTime FechaHora, int IdUsuarioExtranet, string Ip, string InformacionHost, string PcName, bool navigation_valid);
    Task<int>
        RegisterVerificationUserExtranet(Guid identificador_solicitud, string correo_verificación, Guid codigo_verificacion);
    Task<bool>
        UpdateVerificationUserExtranet(Guid identificador_solicitud, string correo_verificación, Guid codigo_verificacion);
}
