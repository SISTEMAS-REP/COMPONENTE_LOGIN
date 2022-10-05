using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordChange
{
    public class PasswordChangeCommand : IRequest
    {
        public int applicationId { get; set; }
        public int? personType { get; set; }
        public string? RecaptchaToken { get; set; }
        public string? UserName { get; set; }
        public string password { get; set; }
    }
}
