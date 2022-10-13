using FluentValidation;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetAccountValidator 
    : AbstractValidator<UpdateExtranetAccountCommand>
{
    public UpdateExtranetAccountValidator()
    {
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
    }
}
