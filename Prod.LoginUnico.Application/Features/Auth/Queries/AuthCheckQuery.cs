using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;

namespace Prod.LoginUnico.Application.Features.Auth.Queries;

public class AuthCheckQuery : IRequest<bool>
{

}

public class AuthCheckHandler
    : IRequestHandler<AuthCheckQuery, bool>
{
	private readonly ICurrentUserService _currentUserService;

	public AuthCheckHandler(ICurrentUserService currentUserService)
	{
		_currentUserService = currentUserService;

    }

	public async Task<bool>
		Handle(AuthCheckQuery request, CancellationToken cancellationToken)
	{
		var currentUser = _currentUserService.User;

		if (currentUser is null
			|| !currentUser.IsAuthenticated)
        {
			throw new BadRequestException("Not logged in");
		}

		return await Task.FromResult(true);
	}
}
