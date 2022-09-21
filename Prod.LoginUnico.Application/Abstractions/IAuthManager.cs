using Prod.LoginUnico.Application.Models;

namespace Prod.LoginUnico.Application.Abstractions;

public interface IAuthManager
{
    Task<Token>
        LogIn(string username, string password);
}
