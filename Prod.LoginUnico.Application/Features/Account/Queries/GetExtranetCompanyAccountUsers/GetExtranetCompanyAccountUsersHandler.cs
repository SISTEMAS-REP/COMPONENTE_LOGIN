using AutoMapper;
using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrappers;


namespace Prod.LoginUnico.Application.Features.Account.Queries.GetExtranetCompanyAccountUsers;

public class GetExtranetCompanyAccountUsersHandler
     : IRequestHandler<GetExtranetCompanyAccountUsersQuery, Response<IEnumerable<GetExtranetCompanyAccountUsersResponse>>>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IExtranetUserUnitOfWork _extranetUserUnitOfWork;
    private readonly IMapper _mapper;

    public GetExtranetCompanyAccountUsersHandler(ICurrentUserService currentUserService,
                                                 IExtranetUserUnitOfWork extranetUserUnitOfWork,
                                                 IMapper mapper)
    {
        _currentUserService = currentUserService;
        _extranetUserUnitOfWork = extranetUserUnitOfWork;
        _mapper = mapper;
    }
    public async Task<Response<IEnumerable<GetExtranetCompanyAccountUsersResponse>>>
        Handle(GetExtranetCompanyAccountUsersQuery request,
               CancellationToken cancellationToken)
    {
        var userId = _currentUserService.User?.UserId;
        if (string.IsNullOrEmpty(userId))
        {
            throw new ForbiddenAccessException("Authentication user not found.");
        }

        var users = await _extranetUserUnitOfWork
            .FindByContactId(int.Parse(userId));


        var usersMapped = _mapper
            .Map<IEnumerable<GetExtranetCompanyAccountUsersResponse>>(users);

        return new()
        {
            Succeeded = true,
            Data = usersMapped
        };
    }
}
