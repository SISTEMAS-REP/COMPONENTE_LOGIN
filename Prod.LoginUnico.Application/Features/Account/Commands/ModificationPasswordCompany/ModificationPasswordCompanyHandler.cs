using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordChange;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Account.Commands.ModificationPasswordCompany
{
    public class ModificationPasswordCompanyHandler : IRequestHandler<ModificationPasswordCompanyCommand>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IExtranetUserManager _extranetUserManager;
        private UserManager<ExtranetUserEntity> UserManager { get; }
        public ModificationPasswordCompanyHandler(
            ICurrentUserService currentUserService,
            IExtranetUserManager extranetUserManager,
             UserManager<ExtranetUserEntity> userManager
            )
        {   
            _currentUserService = currentUserService;
            _extranetUserManager = extranetUserManager;
            UserManager = userManager;
        }
        public async Task<Unit> Handle(ModificationPasswordCompanyCommand request, CancellationToken cancellationToken)
        {
            var userName = _currentUserService.User?.UserName;
            var user = await _extranetUserManager.FindByNameAsync(userName);
            if (user is null)
            {
                throw new UnauthorizedAccessException("Usuario incorrecto.");
            }
            else
            {
                var resd = await UserManager.GeneratePasswordResetTokenAsync(user);
                var res = await UserManager.ResetPasswordAsync(user, resd, request.password);
            }

            return Unit.Value;
        }
    }
}
