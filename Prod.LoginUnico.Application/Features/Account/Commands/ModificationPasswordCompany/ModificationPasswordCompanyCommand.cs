using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Features.Account.Commands.ModificationPasswordCompany
{
    public class ModificationPasswordCompanyCommand: IRequest
    {
        public string password { get; set; }
    }
}
