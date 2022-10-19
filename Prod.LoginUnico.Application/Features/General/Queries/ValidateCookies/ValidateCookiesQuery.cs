using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Features.General.Queries.Logo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.General.Queries.ValidateCookies
{
    public class ValidateCookiesQuery :  IRequest<Response<bool>>
    {
        public int? applicationId { get; set; }
    }

    public class ExtranetValidateCookiesQueryHandler
    : IRequestHandler<ValidateCookiesQuery, Response<bool>>
    {
        private readonly ICurrentUserService _currentUserService;
        public ExtranetValidateCookiesQueryHandler(
            ICurrentUserService currentUserService
        )
        {
            _currentUserService = currentUserService;
        }
        public async Task<Response<bool>>
        Handle(ValidateCookiesQuery request, CancellationToken cancellationToken)
        {
            var user = _currentUserService.User;

            return await Task.FromResult(new Response<bool>()
            {
                Data = user.IsAuthenticated
            });
        }
    }
    
}
