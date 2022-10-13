using AutoMapper;
using Prod.LoginUnico.Application.Common.Mapping;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using Prod.ServiciosExternos.Personas;

namespace Prod.LoginUnico.Application.Features.Account.Queries.GetExtranetAccount;

public class GetExtranetAccountResponse
{
    public GetExtranetUser User { get; set; }

    public GetJuridicPerson JuridicPerson { get; set; }

    public GetNaturalPerson NaturalPerson { get; set; }
}

public class GetExtranetUser : IMapFrom<ExtranetUserEntity>
{
    public int UserId { get; set; }

    public int JuridicPersonId { get; set; }

    public int NaturalPersonId { get; set; }

    public string UserName { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<ExtranetUserEntity, GetExtranetUser>()
            .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.id_usuario_extranet))
            .ForMember(d => d.JuridicPersonId, opt => opt.MapFrom(s => s.id_persona_juridica))
            .ForMember(d => d.NaturalPersonId, opt => opt.MapFrom(s => s.id_persona_natural))
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.user_name))

            .ForMember(d => d.PhoneNumber, opt => opt.MapFrom(s => s.phone_number))
            .ForMember(d => d.Email, opt => opt.MapFrom(s => s.email));
    }
}

public class GetJuridicPerson : IMapFrom<PersonaGeneralResponse>
{
    public int JuridicPersonId { get; set; }

    public string? RucNumber { get; set; }

    public string? BusinessName { get; set; }

    public string? BusinessAddress { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<PersonaGeneralResponse, GetJuridicPerson>()
            .ForMember(d => d.JuridicPersonId, opt => opt.MapFrom(s => s.id_persona))
            .ForMember(d => d.RucNumber, opt => opt.MapFrom(s => s.nro_documento))
            .ForMember(d => d.BusinessName, opt => opt.MapFrom(s => s.razon_social))
            .ForMember(d => d.BusinessAddress, opt => opt.MapFrom(s => s.direccion));
    }
}

public class GetNaturalPerson : IMapFrom<PersonaGeneralResponse>
{
    public int NaturalPersonId { get; set; }

    public string? DocumentNumber { get; set; }

    public string? LastName { get; set; }

    public string? FirstName { get; set; }

    public string? Address { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<PersonaGeneralResponse, GetNaturalPerson>()
            .ForMember(d => d.NaturalPersonId, opt => opt.MapFrom(s => s.id_persona))
            .ForMember(d => d.DocumentNumber, opt => opt.MapFrom(s => s.nro_documento))
            .ForMember(d => d.LastName, opt => opt.MapFrom(s => s.apellidos))
            .ForMember(d => d.FirstName, opt => opt.MapFrom(s => s.nombres))
            .ForMember(d => d.Address, opt => opt.MapFrom(s => s.direccion));
    }
}
