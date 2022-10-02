using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.VerificationPasswordRecovery
{
    public class ExtranetVerificationPasswordRecoveryCommandHandler : IRequestHandler<ExtranetVerificationPasswordRecoveryCommand>
    {
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly AppSettings _appSettings;
        public ExtranetVerificationPasswordRecoveryCommandHandler(IApplicationUnitOfWork applicationUnitOfWork
            , IOptions<AppSettings> options)
        {
            _applicationUnitOfWork = applicationUnitOfWork;
            _appSettings = options.Value;
        }
        public async Task<Unit>
        Handle(ExtranetVerificationPasswordRecoveryCommand request, CancellationToken cancellationToken)
        {
            var resultChek = await _applicationUnitOfWork.UpdateVerificationUserExtranet(request.Identificador, request.Email, request.Code);
            if (resultChek)
            {
                if (request.UserName.Length == 8)
                {
                    Redirection(_appSettings.Urls.URL_LOGIN_UNICO_WEB + string.Format("?Identificador={0}&Code={1}&Email={2}&UserName={3}", request.Identificador, request.Code, request.Email, request.UserName));
                }
                if (request.UserName.Length == 19)
                {
                    Redirection(_appSettings.Urls.URL_LOGIN_UNICO_WEB + string.Format("?Identificador={0}&Code={1}&Email={2}&UserName={3}", request.Identificador, request.Code, request.Email, request.UserName));
                }
            }

            return Unit.Value;
        }
        public RedirectResult Redirection(string urlPost)
        {
            return new RedirectResult(url: urlPost, permanent: false, preserveMethod: true);
        }
    }
}
