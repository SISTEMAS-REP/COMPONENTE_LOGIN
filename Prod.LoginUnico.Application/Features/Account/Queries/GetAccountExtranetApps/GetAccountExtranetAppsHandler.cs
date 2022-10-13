using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrappers;


namespace Prod.LoginUnico.Application.Features.Account.Queries.GetAccountExtranetApps;

public class GetAccountExtranetAppsHandler
     : IRequestHandler<GetAccountExtranetAppsQuery, Response<List<GetAccountExtranetAppsResponse>>>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IApplicationUnitOfWork _applicationUnitOfWork;
    private readonly StaticFiles _staticFiles;

    public GetAccountExtranetAppsHandler(ICurrentUserService currentUserService,
                                          IApplicationUnitOfWork applicationUnitOfWork,
                                          IOptions<AppSettings> options)
    {
        _currentUserService = currentUserService;
        _applicationUnitOfWork = applicationUnitOfWork;
        _staticFiles = options.Value.StaticFiles!;
    }
    public async Task<Response<List<GetAccountExtranetAppsResponse>>>
        Handle(GetAccountExtranetAppsQuery request,
               CancellationToken cancellationToken)
    {
        var userName = _currentUserService.User?.UserName;
        if (string.IsNullOrEmpty(userName))
        {
            throw new ForbiddenAccessException("Authentication user not found.");
        }

        var applications = await _applicationUnitOfWork
            .GetListApplicationByUser(userName);

        var applicationsResponse = applications
            .Select(x =>
            {
                byte[] numArray;
                try
                {
                    var logoPath = Path
                        .Combine(_staticFiles.Logo!, x.id_aplicacion.ToString() + ".png");
                    numArray = File
                        .ReadAllBytes(logoPath);
                }
                catch (FileNotFoundException)
                {
                    numArray = File
                        .ReadAllBytes(Path.Combine(_staticFiles.Logo!, "Logo_Temp.png"));
                }

                var app = new GetAccountExtranetAppsResponse()
                {
                    applicationId = x.id_aplicacion,
                    name = x.nombre,
                    description = x.descripcion,
                    urlExtranet = x.url_extranet,
                    logo = x.conten_img
                };

                return app;
            })
            .ToList();


        return new()
        {
            Succeeded = true,
            Data = applicationsResponse
        };
    }
}
