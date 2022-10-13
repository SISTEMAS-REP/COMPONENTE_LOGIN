
using MediatR;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordChange;


namespace Prod.LoginUnico.Application.Features.Extranet.Commands.CheckMail
{
    public class CheckMailHandler : IRequestHandler<CheckMailCommand, Response<CheckMailResponse>>
    {
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        public CheckMailHandler(IApplicationUnitOfWork applicationUnitOfWork)
        {
            _applicationUnitOfWork = applicationUnitOfWork;
        }
        public async Task<Response<CheckMailResponse>> Handle(CheckMailCommand request, CancellationToken cancellationToken)
        {
            var resultChek = await _applicationUnitOfWork.SP_SEL_VERIFICACION_RECUPERACION_PASSWORD(Guid.Parse(request.identificador!));
            return new()
            {
                Succeeded = resultChek
            };
        }
    }
}
