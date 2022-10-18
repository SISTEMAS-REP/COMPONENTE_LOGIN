using MediatR;
using Microsoft.Extensions.Options;
using Nancy.Json;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrappers;
using Release.Helper;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.ApplicationsUserList
{
    public class ApplicationsUserListHandler
         : IRequestHandler<ApplicationsUserListCommand, Response<ApplicationsUserResponse>>
    {
        private readonly IReCaptchaService _reCaptchaService;
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly StaticFiles _staticFiles;
        private readonly ICurrentUserService _currentUserService;
        private readonly IExtranetUserManager _extranetUserManager;
        public ApplicationsUserListHandler(
            IReCaptchaService reCaptchaService,
            IApplicationUnitOfWork applicationUnitOfWork,
            IOptions<AppSettings> appSettings,
            ICurrentUserService currentUserService,
            IExtranetUserManager extranetUserManager)
        {
            _reCaptchaService = reCaptchaService;
            _applicationUnitOfWork = applicationUnitOfWork;
            _staticFiles = appSettings?.Value?.StaticFiles!;
            _currentUserService = currentUserService;
            _extranetUserManager = extranetUserManager;
        }
        public async Task<Response<ApplicationsUserResponse>>
        Handle(ApplicationsUserListCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.User?.UserId;
            var user = await _extranetUserManager.FindByIdAsync(userId);
            List<ApplicationUserResponse> Listado = new List<ApplicationUserResponse>();

            var listado_aplicacion = await _applicationUnitOfWork.GetListApplicationByUser(user.user_name);

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
