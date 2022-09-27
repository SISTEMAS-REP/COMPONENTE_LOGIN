using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Models;

namespace Prod.LoginUnico.Application.Features.General.Commands.Reniec;

public class GeneralReniecCommand : IRequest<Response<ReniecResultModel>>
{
    public string? documentNumber { get; set; }
}

public class GeneralReniecCommandHandler
    : IRequestHandler<GeneralReniecCommand, Response<ReniecResultModel>>
{
    private readonly IReniecService _reniecService;

    public GeneralReniecCommandHandler(IReniecService reniecService)
    {
        _reniecService = reniecService;
    }

    public async Task<Response<ReniecResultModel>>
        Handle(GeneralReniecCommand request, CancellationToken cancellationToken)
    {
        var reniecResult = await _reniecService
            .FindByDocument(request.documentNumber!);

        if (reniecResult is null)
        {
            throw new NotFoundException("");
        }

        return await Task
            .FromResult(new Response<ReniecResultModel>()
            {
                Succeeded = true,
                Data = reniecResult
            });
    }
}
