using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Models;

namespace Prod.LoginUnico.Application.Features.General.Commands.Migraciones;

public class GeneralMigracionesCommand : IRequest<Response<MigracionesResultModel>>
{
    public string? documentNumber { get; set; }
}

public class GeneralMigracionesCommandHandler
    : IRequestHandler<GeneralMigracionesCommand, Response<MigracionesResultModel>>
{
    private readonly IMigracionesService _migracionesService;

    public GeneralMigracionesCommandHandler(IMigracionesService migracionesService)
    {
        _migracionesService = migracionesService;
    }

    public async Task<Response<MigracionesResultModel>>
        Handle(GeneralMigracionesCommand request, CancellationToken cancellationToken)
    {
        var migracionesResult = await _migracionesService
            .FindByDocument(request.documentNumber!);

        if (migracionesResult is null)
        {
            throw new NotFoundException("");
        }

        return await Task
            .FromResult(new Response<MigracionesResultModel>()
            {
                Succeeded = true,
                Data = migracionesResult
            });
    }
}
