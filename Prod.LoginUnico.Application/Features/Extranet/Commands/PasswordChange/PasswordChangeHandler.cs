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

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordChange
{
    public class PasswordChangeHandler : IRequestHandler<PasswordChangeCommand>
    {
        private readonly IReCaptchaService _reCaptchaService;
        
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly IExtranetUserManager _extranetUserManager;
        private readonly AppSettings _appSettings;
        public PasswordChangeHandler(
            IReCaptchaService reCaptchaService,            
            IApplicationUnitOfWork applicationUnitOfWork,
            IExtranetUserManager extranetUserManager,
            IOptions<AppSettings> options
            )
        {
            _reCaptchaService = reCaptchaService;
            _extranetUserManager = extranetUserManager;
            _applicationUnitOfWork = applicationUnitOfWork;
            _appSettings = options.Value;
        }
        public async Task<Unit> Handle(PasswordChangeCommand request, CancellationToken cancellationToken)
        {
            var recaptchaResult = await _reCaptchaService.Validate(request.RecaptchaToken!);

            if (!recaptchaResult.Success)
            {
                var errors = recaptchaResult.ErrorCodes
                    .Select(e => e)
                    .Aggregate((i, j) => i + ", " + j);
                throw new BadRequestException($"ReCaptcha validation failed: {errors}");
            }

            var pass = string.Join("",MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(request.password)).Select(s => s.ToString("x2")));
            string Decr_user_name = Functions.Decrypt(request.UserName);
            var pass_hash = Convert.FromBase64String(pass);

            var user = await _extranetUserManager.FindByNameAsync(Decr_user_name);
            if (user is null)
            {
                throw new UnauthorizedAccessException("Usuario incorrecto.");
            }
            else
            {
                var resultChek = await _applicationUnitOfWork.ActualizarPassword(Decr_user_name, pass_hash);
            }
            return Unit.Value;
        }
    }
}
