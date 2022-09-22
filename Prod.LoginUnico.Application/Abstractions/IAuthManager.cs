namespace Prod.LoginUnico.Application.Abstractions;

public interface IAuthManager
{
    Task<bool>
        LogIn(string username, string password, bool rememberMe);
}
