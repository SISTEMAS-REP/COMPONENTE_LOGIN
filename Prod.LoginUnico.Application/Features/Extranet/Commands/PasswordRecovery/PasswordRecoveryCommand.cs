﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.PasswordRecovery
{
    public class PasswordRecoveryCommand : IRequest
    {
        public string? documentNumber { get; set; }
        public string? rucNumber { get; set; }
        public string? RecaptchaToken { get; set; }
        public int? personType { get; set; }
        public string? email { get; set; }
        public int applicationId { get; set; }
    }
}