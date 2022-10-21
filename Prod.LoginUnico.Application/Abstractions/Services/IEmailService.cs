using Prod.ServiciosExternos.Entidades;

namespace Prod.LoginUnico.Application.Abstractions.Services;

public interface IEmailService
{
    Task 
        CreatePersonAccount(string email,
        string documentNumber,
        string password);

    Task 
        CreateCompanyAccount(string email,
        string rucNumber,
        string documentNumber,
        string password);

    Task
        PasswordRecovery(string email,
        string urlBase,
        int applicationId,
        string userName,
        Guid guid,
        string returnUrl);
}
