using MediatR;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetPersonAccount;

public class InsertExtranetPersonAccountCommand 
    : IRequest
{
    public string? RecaptchaToken { get; set; } // Cabecera [x-captcha-token] de request

    public int ApplicationId { get; set; } // Parámetro de Url en Frontend

    public int SectorId { get; set; } // Por defecto viene 1 (mejora)

    public int PersonType { get; set; } // 1: Natural


    public int PersonId { get; set; } // De la búsqueda de la persona en Reniec

    public bool? enableRuc { get; set; } // Si digitó o no su ruc en el formulario

    public string? RucNumber { get; set; } // Digitado (RUC 10)

    public string? DocumentNumber { get; set; } // Digitado


    public string? PhoneNumber { get; set; } // Digitado

    public string? Email { get; set; } // Digitado

    public string? Password { get; set; }
}