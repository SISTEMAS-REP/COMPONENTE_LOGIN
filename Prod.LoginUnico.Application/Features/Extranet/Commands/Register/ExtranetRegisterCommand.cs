using MediatR;
using Prod.LoginUnico.Application.Common.Wrapper;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;

public class ExtranetRegisterCommand : IRequest
{
    public int id_aplicacion { get; set; }

    public int Id { get; set; }

    public int IdSector { get; set; }
    
    public int IdTipoPersona { get; set; }
    
    public string CodigoDepartamento { get; set; }
    
    public string CodigoProvincia { get; set; }
    
    public string CodigoDistrito { get; set; }
    
    public int IdTipoIdentificacion { get; set; }
    
    public string RazonSocial { get; set; }
    
    public string Nombres { get; set; }
    
    public string Apellidos { get; set; }
    
    public string NroDocumento { get; set; }
    
    public string Direccion { get; set; }
    
    public string Telefono { get; set; }
    
    public string Email { get; set; }
    
    public string RepresentanteLegal { get; set; }
    
    public string NroDocumentoRepresentante { get; set; }
    
    public int IdTipoIdentificacionRepLeg { get; set; }
    
    public string Flag { get; set; }
    
    public string Usuario { get; set; }
    
    public string Observaciones { get; set; }
    
    public string Celular { get; set; }
    
    public string NroDocPerNatural { get; set; }

    public string Contrasena { get; set; }

    public bool Estado { get; set; }

    public int idContactoExtranet { get; set; }

    public string ruc { get; set; }
}