using Prod.LoginUnico.Application.Models;
using Prod.LoginUnico.Domain.Entities.ExtranetUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Infrastructure.Managers;

public interface ITokenManager
{
    Token GenerateToken(ExtranetUserEntity user);
}
