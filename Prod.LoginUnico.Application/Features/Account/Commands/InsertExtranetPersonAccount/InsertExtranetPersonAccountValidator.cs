using FluentValidation;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetPersonAccount;

public class InsertExtranetPersonAccountValidator 
    : AbstractValidator<InsertExtranetPersonAccountCommand>
{
    public InsertExtranetPersonAccountValidator()
    {
        RuleFor(p => p.RecaptchaToken)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .NotEmpty()
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.ApplicationId)
            .GreaterThan(0)
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.SectorId)
            .GreaterThan(0)
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.PersonType)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .InclusiveBetween(1, 2)
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.PersonId)
            .GreaterThan(0)
            .WithMessage("{PropertyName} es ínválido.");

        /*RuleFor(p => p)
            .Must(p => (p.enableRuc ?? false) && p.DocumentNumber != null)
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .Must(p => (p.enableRuc ?? false) && p.DocumentNumber!.Trim() != string.Empty)
            .WithMessage("{PropertyName} es ínválido.");*/

        RuleFor(p => p.DocumentNumber)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .NotEmpty()
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.PhoneNumber)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .NotEmpty()
            .WithMessage("{PropertyName} es ínválido.");
        
        RuleFor(p => p.Email)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .NotEmpty()
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.Password)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .NotEmpty()
            .WithMessage("{PropertyName} es ínválido.");
    }
}