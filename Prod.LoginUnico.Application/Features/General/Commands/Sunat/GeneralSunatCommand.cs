using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Models;

namespace Prod.LoginUnico.Application.Features.General.Commands.Sunat;

public class GeneralSunatCommand : IRequest<Response<SunatResultModel>>
{
    public string? rucNumber { get; set; }
}

public class GeneralSunatCommandHandler
    : IRequestHandler<GeneralSunatCommand, Response<SunatResultModel>>
{
    private readonly ISunatService _sunatService;

    public GeneralSunatCommandHandler(ISunatService sunatService)
    {
        _sunatService = sunatService;
    }

    public async Task<Response<SunatResultModel>>
        Handle(GeneralSunatCommand request, CancellationToken cancellationToken)
    {
        var sunatResult = await _sunatService
            .FindByRuc(request.rucNumber!);

        if (sunatResult is null)
        {
            throw new NotFoundException("");
        }

        return await Task
            .FromResult(new Response<SunatResultModel>()
            {
                Succeeded = true,
                Data = sunatResult
            });
    }
}
