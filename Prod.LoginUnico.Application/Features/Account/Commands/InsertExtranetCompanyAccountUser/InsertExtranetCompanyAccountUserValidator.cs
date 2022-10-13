using FluentValidation;

namespace Prod.LoginUnico.Application.Features.Account.Commands.InsertExtranetCompanyAccountUser;

public class InsertExtranetCompanyAccountUserValidator 
    : AbstractValidator<InsertExtranetCompanyAccountUserCommand>
{
    public InsertExtranetCompanyAccountUserValidator()
    {
        RuleFor(p => p.PersonType)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .InclusiveBetween(1, 2)
            .WithMessage("{PropertyName} es ínválido.");

        RuleFor(p => p.ApplicationId)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.")
            .GreaterThan(1)
            .WithMessage("{PropertyName} es ínválido.");
    }
}
