using Prod.LoginUnico.Application.Models;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IReniecService
{
    Task<ReniecResultModel?>
        FindByDocument(string documentNumber);
}
