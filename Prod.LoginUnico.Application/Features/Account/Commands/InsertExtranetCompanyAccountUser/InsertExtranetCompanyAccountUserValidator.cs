using FluentValidation;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccountUser;

public class InsertExtranetCompanyAccountUserValidator 
    : AbstractValidator<InsertExtranetCompanyAccountUserCommand>
{
    public InsertExtranetCompanyAccountUserValidator()
    {
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
            .Must(p => p.enableRuc && p.DocumentNumber != null)
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .Must(p => p.enableRuc && p.DocumentNumber!.Trim() != string.Empty)
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