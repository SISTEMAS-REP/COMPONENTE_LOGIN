using FluentValidation;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccount;

public class InsertExtranetCompanyAccountValidator 
    : AbstractValidator<InsertExtranetCompanyAccountCommand>
{
    public InsertExtranetCompanyAccountValidator()
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

        RuleFor(p => p.JuridicalPersonId)
            .GreaterThan(0)
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.RucNumber)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .NotEmpty()
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.NaturalPersonId)
            .GreaterThan(0)
            .WithMessage("{PropertyName} es ínválido.");

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
