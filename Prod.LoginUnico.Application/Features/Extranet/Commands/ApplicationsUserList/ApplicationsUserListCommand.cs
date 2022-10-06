using MediatR;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.ApplicationsUserList
{
    public class ApplicationsUserListCommand : IRequest<Response<ApplicationsUserResponse>>
    {
        public string? RecaptchaToken { get; set; }
        public string? UserName { get; set; }
    }
}
