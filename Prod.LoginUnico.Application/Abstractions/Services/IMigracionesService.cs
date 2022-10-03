using Prod.LoginUnico.Application.Models.Services;

namespace Prod.LoginUnico.Application.Abstractions.Services;

public interface IMigracionesService
{
    Task<MigracionesServiceResponse?>
        FindByDocument(string documentNumber);
}
