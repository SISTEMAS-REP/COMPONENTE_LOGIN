using MediatR;
using Prod.LoginUnico.Application.Common.Wrapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Account.Commands.ValidateCurrentPassword
{
    public  class ValidateCurrentPasswordCommand : IRequest<Response<ValidateCurrentPasswordResponse>>
    {
        public string password { get; set; }
    }
}
