using AutoMapper;
using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrappers;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Application.Features.Account.Queries.GetExtranetAccount;

public class GetExtranetAccountQuery
    : IRequest<Response<GetExtranetAccountResponse>>
{

}

public class AccountExtranetQueryHandler
    : IRequestHandler<GetExtranetAccountQuery, Response<GetExtranetAccountResponse>>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly IPersonasServicio _personasServicio;
    private readonly IMapper _mapper;

    public AccountExtranetQueryHandler(ICurrentUserService currentUserService, 
                                       IExtranetUserManager extranetUserManager,
                                       IPersonasServicio personasServicio,
                                       IMapper mapper)
    {
        _currentUserService = currentUserService;
        _extranetUserManager = extranetUserManager;
        _personasServicio = personasServicio;
        _mapper = mapper;
    }

    public async Task<Response<GetExtranetAccountResponse>>
        Handle(GetExtranetAccountQuery request,
               CancellationToken cancellationToken)
    {
        var userId = _currentUserService.User?.UserId;
        if (string.IsNullOrEmpty(userId))
        {
            throw new ForbiddenAccessException("Authentication user not found.");
        }

        var userEntity = await _extranetUserManager.FindByIdAsync(userId);
        if (userEntity is null)
        {
            throw new NotFoundException("Usuario no existe");
        }
        var user = _mapper.Map<GetExtranetUser>(userEntity);

        var juridicPersonResponse = _personasServicio.ObtenerPersona(new()
        {
            id_persona = user.JuridicPersonId,
        });
        var juridicPerson = _mapper.Map<GetJuridicPerson>(juridicPersonResponse.Data);

        var naturalPersonResponse = _personasServicio.ObtenerPersona(new()
        {
            id_persona = user.NaturalPersonId,
        });
        var naturalPerson = _mapper.Map<GetNaturalPerson>(naturalPersonResponse.Data);

        if (naturalPersonResponse is null
            || naturalPersonResponse.Data is null)
        {
            throw new NotFoundException("Recurso no existe");
        }

        // Mapeo de campos
        /*var result = _mapper
                .Map<ExtranetUserInfoResponse>(naturalPersonResponse.Data);*/

        return await Task
            .FromResult(new Response<GetExtranetAccountResponse>()
            {
                Succeeded = true,
                Data = new()
                {
                    User = user,
                    JuridicPerson = juridicPerson,
                    NaturalPerson = naturalPerson
                }
            });
    }
}