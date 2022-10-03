
using MediatR;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.NaturalPersonInsert;

public class NaturalPersonInsertCommand : IRequest
{
    // Parámetros para flujo de registro
    public string? RecaptchaToken { get; set; } // Cabecera [x-captcha-token] de request

    public int ApplicationId { get; set; } // Parámetro de Url en Frontend

    public int SectorId { get; set; } // Por defecto viene 1 (mejora)

    public int PersonType { get; set; } // 1: Natural


    // Datos obligatorios
    public int PersonId { get; set; } // De la búsqueda de la persona en Reniec

    public bool? enableRuc { get; set; } // Si digitó o no su ruc en el formulario

    // RUC persona natural
    public string? RucNumber { get; set; } // Digitado (RUC 10)

    public string? DocumentNumber { get; set; } // Digitado

    // Contacto
    public string? PhoneNumber { get; set; } // Digitado

    public string? Email { get; set; } // Digitado

    // Credenciales
    public string? Password { get; set; }
}
