using Prod.LoginUnico.Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Abstractions;

public interface ISunatService
{
    Task<SunatResultModel?>
        FindByRuc(string rucNumber);
}
