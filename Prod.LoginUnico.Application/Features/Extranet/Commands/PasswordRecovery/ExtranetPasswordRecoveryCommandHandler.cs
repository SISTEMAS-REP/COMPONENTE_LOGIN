using MediatR;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery
{
    public class ExtranetPasswordRecoveryCommandHandler
        : IRequestHandler<ExtranetPasswordRecoveryCommand>
    {
        private readonly IPersonsService _personsService;
        private readonly IReCaptchaService _reCaptchaService;
        private readonly IExtranetUserManager _extranetUserManager;
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly AppSettings _appSettings;
        public ExtranetPasswordRecoveryCommandHandler(
            IPersonsService personsService, 
            IReCaptchaService reCaptchaService, 
            IExtranetUserManager extranetUserManager, 
            IApplicationUnitOfWork applicationUnitOfWork,
            IOptions<AppSettings> options
            )
        {
            _personsService = personsService;
            _reCaptchaService = reCaptchaService;
            _extranetUserManager = extranetUserManager;
            _applicationUnitOfWork = applicationUnitOfWork;
            _appSettings = options.Value;
        }

        public async Task<Unit>
        Handle(ExtranetPasswordRecoveryCommand request, CancellationToken cancellationToken)
            {
            //var recaptchaResult = await _reCaptchaService.Validate(request.recaptchaToken);

            //if (!recaptchaResult.Success)
            //{
            //    var errors = recaptchaResult.ErrorCodes
            //        .Select(e => e)
            //        .Aggregate((i, j) => i + ", " + j);
            //    throw new BadRequestException($"ReCaptcha validation failed: {errors}");
            //}
            var numero_documento = request.PersonType == 1 ? request.DocumentNumber : request.rucNumber + "" + request.DocumentNumber;
            var guid = Guid.NewGuid();
            var guid2 = Guid.NewGuid();
            var urlBase = _appSettings.Urls.URL_LOGIN_UNICO_WEB + "Verificaciones/EmailLoginUnico/[" + numero_documento + "]";
            var user = await _extranetUserManager
           .FindByNameAsync(numero_documento);
            if (user is null)
            {
                throw new UnauthorizedAccessException("Usuario incorrecto.");
            }
            else
            {
                if (request.PersonType == 1)
                {
                    if (request.email.ToLower() == user.email.ToLower())
                    {
                        var resultChek = await _applicationUnitOfWork.RegisterVerificationUserExtranet(guid, request.email.ToLower(), guid2);
                        int pos = urlBase.IndexOf('[');
                        int posUlt = urlBase.IndexOf(']');
                        string userName = urlBase.Substring(pos + 1, posUlt - pos - 1);
                        urlBase = urlBase.Substring(0, pos);

                        string url = string.Empty;

                        var query = new NameValueCollection()
                        {
                            {"Identificador",   guid.ToString()},
                            {"Code",            guid2.ToString()},
                            {"Email",           request.email.ToLower()},
                            {"UserName", userName}
                        };
                        var qs = ToQueryString(query);
                        url = urlBase + qs;

                        //return _basicMailer.EnviarCorreo(token.CorreoVerificación, EmailSubject, EmailTemplateName, new { url });
                    }
                    else
                    {
                        throw new UnauthorizedAccessException("El correo ingresado no coincide con el correo registrado al usuario.");
                    }

                }
                else
                {

                }

            }
            return Unit.Value;
        }
        public string ToQueryString(NameValueCollection nvc)
        {
            var array = (from key in nvc.AllKeys
                         from value in nvc.GetValues(key)
                         select string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(value)))
                .ToArray();
            return "?" + string.Join("&", array);
        }
    }   
}
