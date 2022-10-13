using AutoMapper;
using Prod.LoginUnico.Application.Common.Mapping;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Features.Account.Queries.GetExtranetCompanyAccountUsers;

public class GetExtranetCompanyAccountUsersResponse : IMapFrom<ExtranetUser>
{
    public int UserId { get; set; }

    public string? UserName { get; set; }

    public string? DocumentNumber { get; set; }

    public string? LastName { get; set; }

    public string? FirstName { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<ExtranetUser, GetExtranetCompanyAccountUsersResponse>()
           .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.id_usuario_extranet))
           .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.user_name))
           .ForMember(d => d.DocumentNumber, opt => opt.MapFrom(s => s.nro_documento))
           .ForMember(d => d.LastName, opt => opt.MapFrom(s => s.apellidos))
           .ForMember(d => d.FirstName, opt => opt.MapFrom(s => s.nombres))
           .ForMember(d => d.PhoneNumber, opt => opt.MapFrom(s => s.phone_number))
           .ForMember(d => d.Email, opt => opt.MapFrom(s => s.email));
    }
}
