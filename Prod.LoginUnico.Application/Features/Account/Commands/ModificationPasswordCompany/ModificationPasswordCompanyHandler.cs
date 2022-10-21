using MediatR;
using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;

namespace Prod.LoginUnico.Application.Features.Account.Commands.ModificationPasswordCompany;

public class ModificationPasswordCompanyHandler : IRequestHandler<ModificationPasswordCompanyCommand>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IExtranetUserManager _extranetUserManager;

    public ModificationPasswordCompanyHandler(ICurrentUserService currentUserService,
        IExtranetUserManager extranetUserManager,
        UserManager<ExtranetUserEntity> userManager)
    {   
        _currentUserService = currentUserService;
        _extranetUserManager = extranetUserManager;
    }
    public async Task<Unit> Handle(ModificationPasswordCompanyCommand request, 
        CancellationToken cancellationToken)
    {
        var userName = _currentUserService.User?.UserName;

        if (string.IsNullOrEmpty(userName))
        {
            throw new ForbiddenAccessException("Authentication user not found.");
        }

        var user = await _extranetUserManager
            .FindByNameAsync(userName);

        if (user is null)
        {
            throw new UnauthorizedAccessException("Usuario incorrecto.");
        }

        var passwordResult = await _extranetUserManager
                .AddPasswordAsync(user, request.Password!);

        if (!passwordResult)
        {
            throw new ApiException("Ocurrió un problema para actualizar su información. " +
                "Inténtelo nuevamente.");
        }

        return Unit.Value;
    }
}
