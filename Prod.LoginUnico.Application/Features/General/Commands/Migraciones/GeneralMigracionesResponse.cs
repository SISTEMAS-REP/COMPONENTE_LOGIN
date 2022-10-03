using AutoMapper;
using Prod.LoginUnico.Application.Common.Mapping;
using Prod.ServiciosExternos.Entidades;
using Prod.ServiciosExternos.Personas;

namespace Prod.LoginUnico.Application.Features.General.Commands.Sunat;

public class GeneralMigracionesResponse : IMapFrom<(BuscarPersonaResponse, PersonaGeneralResponse)>
{
    public int PersonId { get; set; }

    public string? DocumentNumber { get; set; }

    public string? LastName { get; set; }

    public string? FirstName { get; set; }

    public string? Address { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<BuscarPersonaResponse, GeneralMigracionesResponse>()
            .ForMember(d => d.DocumentNumber, opt => opt.MapFrom(s => s.dni))
            .ForMember(d => d.LastName, opt => opt.MapFrom(s =>
                $"{s.apellidoPaterno} " + $"{s.apellidoMaterno}"))
            .ForMember(d => d.FirstName, opt => opt.MapFrom(s => s.nombre))
            .ForMember(d => d.Address, opt => opt.MapFrom(s => s.direccion));

        profile.CreateMap<PersonaGeneralResponse, GeneralMigracionesResponse>()
            .ForMember(d => d.PersonId, opt => opt.MapFrom(s => s.id_persona))
            .ForMember(d => d.DocumentNumber, opt => opt.MapFrom(s => s.nro_documento))
            .ForMember(d => d.LastName, opt => opt.MapFrom(s => s.apellidos))
            .ForMember(d => d.FirstName, opt => opt.MapFrom(s => s.nombres))
            .ForMember(d => d.Address, opt => opt.MapFrom(s => s.direccion));
    }
}
