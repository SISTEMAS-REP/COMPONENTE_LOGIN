using MediatR;
using Prod.LoginUnico.Application.Common.Wrappers;

namespace Prod.LoginUnico.Application.Features.Account.Queries.GetAccountExtranetApps;

public class GetAccountExtranetAppsQuery
    : IRequest<Response<List<GetAccountExtranetAppsResponse>>>
{

}
