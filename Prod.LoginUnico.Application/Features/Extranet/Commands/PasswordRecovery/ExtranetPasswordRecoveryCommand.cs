using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery
{
    public class ExtranetPasswordRecoveryCommand : IRequest
    {
        public string? DocumentNumber { get; set; }
        public string? Ruc { get; set; }
        public string recaptchaToken { get; set; }
        public int? PersonType { get; set; }
        public string? email { get;set; }
    }
}
