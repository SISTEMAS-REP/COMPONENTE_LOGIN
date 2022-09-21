namespace Prod.LoginUnico.Application.Common.Exceptions;

public class NullException : Exception
{
    public NullException(string message)
        : base(message)
    {
    }
}