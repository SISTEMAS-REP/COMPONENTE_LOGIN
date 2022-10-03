using FluentValidation;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;

public class ExtranetAuthValidator : AbstractValidator<ExtranetAuthCommand>
{
    public ExtranetAuthValidator()
    {
        RuleFor(p => p.PersonType)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .InclusiveBetween(1, 2)
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.RucNumber)
            //.NotNull().NotEmpty()
            //.Cascade(CascadeMode.Stop)
            .Must(p => !string.IsNullOrEmpty(p))
            .When(p => p.PersonType == 2)
            .WithMessage("{PropertyName} es un valor obligatorio.");

        RuleFor(p => p.RucNumber)
            .Must(x => long.TryParse(x, out _))
            .When(p => p.PersonType == 2)
            .WithMessage("{PropertyName} solo puede contener dígitos.");

        RuleFor(p => p.RucNumber)
            .Length(11)
            .When(p => p.PersonType == 2)
            .WithMessage("{PropertyName} solo están permitidos 11 dígitos");

        /*RuleFor(p => p.RucNumber)
            .Must(c => c.StartsWith("20"))
            .When(p => p.PersonType == 2)
            .WithMessage("{PropertyName} es un valor obligatorio.");*/

        RuleFor(p => p.DocumentNumber)
            .Must(c => !string.IsNullOrEmpty(c))
                .WithMessage("{PropertyName} es un valor obligatorio.")
            .Must(x => int.TryParse(x, out var val) && val > 0)
                .WithMessage("{PropertyName} solo puede contener dígitos.")
            .Length(8)
                .WithMessage("{PropertyName} solo están permitidos 8 dígitos.");

        RuleFor(p => p.RememberMe)
            .NotNull()
                .WithMessage("{PropertyName} es inválido.");

        RuleFor(p => p.RememberMe)
            .NotNull()
                .WithMessage("{PropertyName} es inválido.");
    }
}
