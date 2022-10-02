using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.VerificationPasswordRecovery
{
    public class ExtranetVerificationPasswordRecoveryCommand : IRequest
    {
        public Guid Identificador { get; set; }
        public Guid Code { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
    }
}
