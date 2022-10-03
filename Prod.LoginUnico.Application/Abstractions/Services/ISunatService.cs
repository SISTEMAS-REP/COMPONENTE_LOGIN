using Prod.LoginUnico.Application.Models.Services;
using Prod.ServiciosExternos.Entidades;

namespace Prod.LoginUnico.Application.Abstractions.Services;

public interface ISunatService
{
    Task<SunatServiceResponse?>
        FindByRuc(string rucNumber);
}
