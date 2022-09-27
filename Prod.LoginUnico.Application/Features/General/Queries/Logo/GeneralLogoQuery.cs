using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrapper;

namespace Prod.LoginUnico.Application.Features.General.Queries.Logo;

public class GeneralLogoQuery : IRequest<Response<byte[]>>
{
    public int? applicationId { get; set; }
}

public class ExtranetLogoQueryHandler
    : IRequestHandler<GeneralLogoQuery, Response<byte[]>>
{
    private readonly StaticFiles _staticFiles;

    public ExtranetLogoQueryHandler(IOptions<AppSettings> appSettings)
    {
        _staticFiles = appSettings.Value.StaticFiles;
    }

    public async Task<Response<byte[]>>
        Handle(GeneralLogoQuery request, CancellationToken cancellationToken)
    {
        byte[] logoBytes;

        try
        {
            var logoPath = Path
                .Combine(_staticFiles.Logo, request.applicationId.ToString() + ".png");
            logoBytes = File
                .ReadAllBytes(logoPath);
        }
        catch (FileNotFoundException)
        {
            logoBytes = File
                .ReadAllBytes(Path.Combine(_staticFiles.Logo, "Logo_Temp.png"));
        }

        return await Task.FromResult(new Response<byte[]>()
        {
            Succeeded = true,
            Data = logoBytes
        });
    }
}