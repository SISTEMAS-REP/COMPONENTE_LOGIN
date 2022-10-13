using MediatR;
using Prod.LoginUnico.Application.Common.Wrappers;

namespace Prod.LoginUnico.Application.Features.Account.Queries.GetExtranetCompanyAccountUsers;

public class GetExtranetCompanyAccountUsersQuery
    : IRequest<Response<IEnumerable<GetExtranetCompanyAccountUsersResponse>>>
{

}
