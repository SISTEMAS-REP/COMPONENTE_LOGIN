using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;
using Prod.ServiciosExternos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using Prod.LoginUnico.Application.Common.Wrapper;

namespace Prod.LoginUnico.Application.Features.Account.Commands.ValidateCurrentPassword
{
    public class ValidateCurrentPasswordHandler : IRequestHandler<ValidateCurrentPasswordCommand, Response<ValidateCurrentPasswordResponse>>
    {
        private SignInManager<ExtranetUserEntity> SignInManager { get; }
        private readonly ICurrentUserService _currentUserService;
        private readonly IExtranetUserManager _extranetUserManager;
        public ValidateCurrentPasswordHandler(SignInManager<ExtranetUserEntity> signInManager, ICurrentUserService currentUserService, IExtranetUserManager extranetUserManager)
        {
            SignInManager = signInManager;
            _currentUserService = currentUserService;
            _extranetUserManager = extranetUserManager;
        }
        public async Task<Response<ValidateCurrentPasswordResponse>>
        Handle(ValidateCurrentPasswordCommand request,
               CancellationToken cancellationToken)
        {
            
                var userId = _currentUserService.User?.UserId;
                var user = await _extranetUserManager.FindByIdAsync(userId);

                var result = await SignInManager
                .PasswordSignInAsync(
                    user: user,
                    password: request.current_password,
                    isPersistent: true,
                    lockoutOnFailure: true);

            return new()
            {
                Succeeded = result.Succeeded
            };
        }
    }
}
