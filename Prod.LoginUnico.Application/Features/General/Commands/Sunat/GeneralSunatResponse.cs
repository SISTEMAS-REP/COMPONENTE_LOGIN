using AutoMapper;
using Prod.LoginUnico.Application.Common.Mapping;
using Prod.ServiciosExternos.Entidades;
using Prod.ServiciosExternos.Personas;

namespace Prod.LoginUnico.Application.Features.General.Commands.Sunat;

public class GeneralSunatResponse : IMapFrom<(SunatResponse, PersonaGeneralResponse)>
{
    public int? PersonId { get; set; }

    public string? RucNumber { get; set; }

    public string? BusinessName { get; set; }

    public string? BusinessAddress { get; set; }

    public int? DocumentType { get; set; }

    public string? DocumentNumber { get; set; }

    public string? LastName { get; set; }

    public string? FirstName { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<SunatResponse, GeneralSunatResponse>()
            .ForMember(d => d.RucNumber, opt => opt.MapFrom(s => s.numeroRuc))
            .ForMember(d => d.BusinessName, opt => opt.MapFrom(s => s.razonSocial))
            .ForMember(d => d.BusinessAddress, opt => opt.MapFrom(s => s.domicilio));

        profile.CreateMap<PersonaGeneralResponse, GeneralSunatResponse>()
            .ForMember(d => d.PersonId, opt => opt.MapFrom(s => s.id_persona))
            .ForMember(d => d.RucNumber, opt => opt.MapFrom(s => s.nro_documento))
            .ForMember(d => d.BusinessName, opt => opt.MapFrom(s => s.razon_social))
            .ForMember(d => d.BusinessAddress, opt => opt.MapFrom(s => s.direccion))

            .ForMember(d => d.DocumentType, opt => opt.MapFrom(s => s.id_tipo_identificacion))
            .ForMember(d => d.DocumentNumber, opt => opt.MapFrom(s => s.nro_docpernatural))
            .ForMember(d => d.LastName, opt => opt.MapFrom(s => s.apellidos))
            .ForMember(d => d.FirstName, opt => opt.MapFrom(s => s.nombres));
    }
}
