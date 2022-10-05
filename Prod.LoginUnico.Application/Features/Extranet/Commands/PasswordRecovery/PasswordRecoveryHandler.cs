using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Common.Options;
using System.Collections.Specialized;
using System.Web;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.ServiciosExternos;
using Release.Helper;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery
{
    public class PasswordRecoveryHandler
        : IRequestHandler<PasswordRecoveryCommand>
    {
        private readonly IReCaptchaService _reCaptchaService;
        private readonly IExtranetUserManager _extranetUserManager;
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly AppSettings _appSettings;
        private readonly IEmailSender _EmailSender;
        public PasswordRecoveryHandler(
            IReCaptchaService reCaptchaService, 
            IExtranetUserManager extranetUserManager, 
            IApplicationUnitOfWork applicationUnitOfWork,
            IOptions<AppSettings> options,
            IEmailSender emailSender
            )
        {
            _reCaptchaService = reCaptchaService;
            _extranetUserManager = extranetUserManager;
            _applicationUnitOfWork = applicationUnitOfWork;
            _appSettings = options.Value;
            _EmailSender = emailSender;
        }

        public async Task<Unit>
        Handle(PasswordRecoveryCommand request, CancellationToken cancellationToken)
        {
            //var recaptchaResult = await _reCaptchaService.Validate(request.recaptchaToken);

            //if (!recaptchaResult.Success)
            //{
            //    var errors = recaptchaResult.ErrorCodes
            //        .Select(e => e)
            //        .Aggregate((i, j) => i + ", " + j);
            //    throw new BadRequestException($"ReCaptcha validation failed: {errors}");
            //}
            var numero_documento = request.personType == 1 ? request.documentNumber : request.rucNumber + "" + request.documentNumber;
            var guid = Guid.NewGuid();
            var guid2 = Guid.NewGuid();
            var urlBase = "";

            if (request.personType == 1)
            {
                urlBase = _appSettings.Urls.URL_LOGIN_UNICO_CAMBIAR_PERSONA + "[" + numero_documento + "]";
            }
            else
            {
                urlBase = _appSettings.Urls.URL_LOGIN_UNICO_CAMBIAR_EMPRESA + "[" + numero_documento + "]";
            }

            var user = await _extranetUserManager
           .FindByNameAsync(numero_documento);
            if (user is null)
            {
                throw new UnauthorizedAccessException("Usuario incorrecto.");
            }
            else
            {
                if (request.personType == 1)
                {
                    if (request.email.ToLower() == user.email.ToLower())
                    {
                        //var resultChek = await _applicationUnitOfWork.RegisterVerificationUserExtranet(guid, request.email.ToLower(), guid2);
                        int pos = urlBase.IndexOf('[');
                        int posUlt = urlBase.IndexOf(']');
                        string userName = urlBase.Substring(pos + 1, posUlt - pos - 1);
                        urlBase = urlBase.Substring(0, pos);

                        string url = string.Empty;

                        var query = new NameValueCollection()
                        {
                            {"applicationId",   request.applicationId.ToString() },
                            {"UserName",        Functions.Encrypt(userName) }
                        };
                        var qs = ToQueryString(query);
                        url = urlBase + qs;

                        var dinamicText = new
                        {
                            url = url
                        };

                        try
                        {
                            _EmailSender.Send("PasswordRecovery",
                            new ServiciosExternos.Entidades.EmailRequest
                            {
                                to = "jesus.angel.lrt@gmail.com", //request.email,
                                isBodyHtml = true,
                                subject = "LOGIN UNICO - Reiniciar Contraseña"
                            }, dinamicText);
                        }
                        catch (Exception ex)
                        {

                        }


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