namespace Prod.LoginUnico.Application.Common.Exceptions;

public class ForbiddenAccessException : Exception
{
    public ForbiddenAccessException(string message = "Acceso prohibido.")
        : base(message) { }
}
