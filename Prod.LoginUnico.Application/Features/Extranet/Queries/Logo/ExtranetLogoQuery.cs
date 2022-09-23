using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Extranet.Queries.Logo;

public class ExtranetLogoQuery : IRequest<Response<byte[]>>
{
    public int? id_aplicacion { get; set; }
}

public class ExtranetLogoQueryHandler
    : IRequestHandler<ExtranetLogoQuery, Response<byte[]>>
{
    private readonly StaticFiles _staticFiles;

    public ExtranetLogoQueryHandler(IOptions<AppSettings> appSettings)
    {
        _staticFiles = appSettings.Value.StaticFiles;
    }

    public async Task<Response<byte[]>>
        Handle(ExtranetLogoQuery request, CancellationToken cancellationToken)
    {
        byte[] logoBytes;
        try
        {
            var logoPath = Path
                .Combine(_staticFiles.Logo, request.id_aplicacion.ToString() + ".png");
            logoBytes = File
                .ReadAllBytes(logoPath);
        } catch (FileNotFoundException)
        {
            logoBytes = File
                .ReadAllBytes(Path.Combine(_staticFiles.Logo, "Logo_Temp.png"));
        }
        
        return new()
        {
            Succeeded = true,
            Data = logoBytes
        };
    }
}