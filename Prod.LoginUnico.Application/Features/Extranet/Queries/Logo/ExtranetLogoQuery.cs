using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrapper;

namespace Prod.LoginUnico.Application.Features.Extranet.Queries.Logo;

public class ExtranetLogoQuery 
    : IRequest<Response<byte[]>>
{
    public int? ApplicationId { get; set; }
}

public class ExtranetLogoQueryHandler
    : IRequestHandler<ExtranetLogoQuery, Response<byte[]>>
{
    private readonly StaticFiles _staticFiles;

    public ExtranetLogoQueryHandler(IOptions<AppSettings> appSettings)
    {
        _staticFiles = appSettings.Value.StaticFiles!;
    }

    public async Task<Response<byte[]>>
        Handle(ExtranetLogoQuery request,
               CancellationToken cancellationToken)
    {
        byte[] logoBytes;
        try
        {
            var logoPath = Path
                .Combine(_staticFiles.Logo!, request.ApplicationId.ToString() + ".png");
            logoBytes = File
                .ReadAllBytes(logoPath);
        } catch (FileNotFoundException)
        {
            logoBytes = File
                .ReadAllBytes(Path.Combine(_staticFiles.Logo!, "Logo_Temp.png"));
        }
        
        return await Task.FromResult(new Response<byte[]>()
        {
            Succeeded = true,
            Data = logoBytes
        });
    }
}