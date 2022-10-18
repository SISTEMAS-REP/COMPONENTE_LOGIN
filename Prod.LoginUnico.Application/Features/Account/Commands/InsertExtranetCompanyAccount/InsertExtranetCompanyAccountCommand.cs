using MediatR;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccount;

public class InsertExtranetCompanyAccountCommand 
    : IRequest
{
    public string? RecaptchaToken { get; set; } // Cabecera [x-captcha-token] de request

    public int ApplicationId { get; set; } // Parámetro de Url en Frontend

    public int SectorId { get; set; } // Por defecto viene 1 (mejora)

    public int PersonType { get; set; } // Parameter 2: Jurídica


    public int JuridicalPersonId { get; set; } // De la búsqueda de la empresa en Sunat

    public string? RucNumber { get; set; }

    
    public int NaturalPersonId { get; set; } // De la búsqueda del representante en Reniec/Migraciones

    public string? DocumentNumber { get; set; }


    public string? PhoneNumber { get; set; } // Digitado

    public string? Email { get; set; } // Digitado

    public string? Password { get; set; }
}
