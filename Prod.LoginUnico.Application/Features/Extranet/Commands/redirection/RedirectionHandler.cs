using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordChange;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.redirection
{
    public class RedirectionHandler : Response<PasswordChangeCommand>
    {
        private readonly AppSettings _appSettings;
        public RedirectionHandler(IOptions<AppSettings> options)
        {
            _appSettings = options.Value;
        }
        public async Task<Response<ExtranetAuthResponse>> Handle(PasswordChangeCommand request, CancellationToken cancellationToken)
        {
            var urlBase = _appSettings.Urls?.Url_cambiar_password_persona;
            return new()
            {
                Succeeded = true,
                Data = new()
                {
                    ReturnUrl = urlBase!
                }
            };
        }
    }
}
