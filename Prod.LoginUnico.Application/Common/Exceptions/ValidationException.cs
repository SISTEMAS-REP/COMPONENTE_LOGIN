using FluentValidation.Results;

namespace Prod.LoginUnico.Application.Common.Exceptions;

public class ValidationException : Exception
{
    public IDictionary<string, string[]> Errors { get; }
    //public List<string> Errors { get; }

    public ValidationException()
        : base("Se han producido uno o más errores de validación.")
    {
        Errors = new Dictionary<string, string[]>();
        //Errors = new List<string>();
    }

    public ValidationException(IEnumerable<ValidationFailure> failures)
        : this()
    {
        Errors = failures
            .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
            .ToDictionary(failureGroup => failureGroup.Key,
            failureGroup => failureGroup.ToArray());

        /*Errors = failures
            .Select(s => s.ErrorMessage)
            .ToList();*/
    }
}