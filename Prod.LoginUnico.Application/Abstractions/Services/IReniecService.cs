using Prod.LoginUnico.Application.Models.Services;

namespace Prod.LoginUnico.Application.Abstractions.Services;

public interface IReniecService
{
    Task<ReniecServiceResponse?>
        FindByDocument(string documentNumber);
}
