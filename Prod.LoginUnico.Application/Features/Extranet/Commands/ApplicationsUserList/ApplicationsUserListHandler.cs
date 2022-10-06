using MediatR;
using Microsoft.Extensions.Options;
using Nancy.Json;
using Newtonsoft.Json.Linq;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery;
using Prod.ServiciosExternos;
using Prod.ServiciosExternos.PRODUCE_VIRTUAL;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.ApplicationsUserList
{
    public class ApplicationsUserListHandler
         : IRequestHandler<ApplicationsUserListCommand, Response<ApplicationsUserResponse>>
    {
        private readonly IReCaptchaService _reCaptchaService;
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly StaticFiles _staticFiles;
        public ApplicationsUserListHandler(
            IReCaptchaService reCaptchaService,
            IApplicationUnitOfWork applicationUnitOfWork,
            IOptions<AppSettings> appSettings
            )
        {
            _reCaptchaService = reCaptchaService;
            _applicationUnitOfWork = applicationUnitOfWork;
            _staticFiles = appSettings?.Value?.StaticFiles!;
        }
        public async Task<Response<ApplicationsUserResponse>>
        Handle(ApplicationsUserListCommand request, CancellationToken cancellationToken)
        {
            List<ApplicationUserResponse> Listado = new List<ApplicationUserResponse>();

            //string tokenDesEncrypted = Functions.Decrypt(request.UserName);
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //dynamic blogObject = js.Deserialize<dynamic>(tokenDesEncrypted);
            //string User_Name = blogObject["UserName"];

            var listado_aplicacion = await _applicationUnitOfWork.GetListApplicationByUser(request.UserName);

            foreach (var applicacion in listado_aplicacion)
            {
                byte[] numArray;
                try
                {
                    var logoPath = Path
                    .Combine(_staticFiles.Logo, applicacion.id_aplicacion.ToString() + ".png");
                    numArray = File.ReadAllBytes(logoPath);
                }
                catch (System.IO.FileNotFoundException ex)
                {
                    numArray = File.ReadAllBytes(Path.Combine(_staticFiles.Logo, "Logo_Temp.png"));
                }

                applicacion.conten_img = numArray;
                Listado.Add(applicacion);

            }


            return new()
            {
                Succeeded = true,
                Data = new()
                {
                   ApplicationUser = Listado
                }
            };
        }
    }
}
