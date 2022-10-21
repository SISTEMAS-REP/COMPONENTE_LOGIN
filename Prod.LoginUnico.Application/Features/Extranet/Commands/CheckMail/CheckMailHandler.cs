using MediatR;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Wrappers;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.CheckMail;

public class CheckMailHandler 
    : IRequestHandler<CheckMailCommand, Response<Unit>>
{
    private readonly IApplicationUnitOfWork _applicationUnitOfWork;
    public CheckMailHandler(IApplicationUnitOfWork applicationUnitOfWork)
    {
        _applicationUnitOfWork = applicationUnitOfWork;
    }
    public async Task<Response<Unit>> Handle(CheckMailCommand request, 
        CancellationToken cancellationToken)
    {
        var resultChek = await _applicationUnitOfWork
            .SP_SEL_VERIFICACION_RECUPERACION_PASSWORD(Guid.Parse(request.identificador!));

        return new()
        {
            Succeeded = resultChek
        };
    }
}
