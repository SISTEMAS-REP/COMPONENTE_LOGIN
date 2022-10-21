using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery;
using System.Security.Cryptography;
using System.Text;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Release.Helper;
using Nancy.Json;
using Prod.LoginUnico.Application.Common.Exceptions;
using Microsoft.AspNetCore.Identity;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using Prod.LoginUnico.Application.Common;
using System;
using Prod.LoginUnico.Application.Common.Wrappers;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordChange
{
    public class PasswordChangeHandler : IRequestHandler<PasswordChangeCommand, Response<PasswordChangeResponse>>
    {
        private readonly IReCaptchaService _reCaptchaService;
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly IExtranetUserManager _extranetUserManager;
        private readonly IPasswordHasher passwordHasher;
        private UserManager<ExtranetUserEntity> UserManager { get; }
        public PasswordChangeHandler(
            IReCaptchaService reCaptchaService,            
            IApplicationUnitOfWork applicationUnitOfWork,
            IExtranetUserManager extranetUserManager,
            IPasswordHasher passwordHasher,
             UserManager<ExtranetUserEntity> userManager
            )
        {
            _reCaptchaService = reCaptchaService;
            _extranetUserManager = extranetUserManager;
            _applicationUnitOfWork = applicationUnitOfWork;
            this.passwordHasher = passwordHasher;
            UserManager = userManager;
        }
        public async Task<Response<PasswordChangeResponse>> Handle(PasswordChangeCommand request, CancellationToken cancellationToken)
        {
            var recaptchaResult = await _reCaptchaService.Validate(request.RecaptchaToken!);

            if (!recaptchaResult.Success)
            {
                var errors = recaptchaResult.ErrorCodes
                    .Select(e => e)
                    .Aggregate((i, j) => i + ", " + j);
                throw new BadRequestException($"ReCaptcha validation failed: {errors}");
            }

            await _applicationUnitOfWork.SP_INS_UPD_VERIFICACION_RECUPERACION_PASSWORD(Guid.Parse(request.identificador!), "", true);

            string Decr_user_name = Functions.Decrypt(request.UserName);
            var pass = string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(Decr_user_name + request.password)).Select(s => s.ToString("x2")));
            var user = await _extranetUserManager.FindByNameAsync(Decr_user_name);
            var hash = request.password != null ? passwordHasher.HashPassword(user, request.password) : null;
            var pass_hash = Convert.FromBase64String(hash);


            if (user is null)
            {
                throw new UnauthorizedAccessException("Usuario incorrecto.");
            }
            else
            {
                var resd = await UserManager.GeneratePasswordResetTokenAsync(user);
                var res = await UserManager.ResetPasswordAsync(user, resd, request.password);
            }

            return new();
        }
    }
}
