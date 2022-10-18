using FluentValidation;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetCompanyAccountUser
    : AbstractValidator<UpdateExtranetCompanyAccountUserCommand>
{
    public UpdateExtranetCompanyAccountUser()
    {
        RuleFor(p => p.UserId)
            .GreaterThan(0)
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

        RuleFor(p => p.Activo)
            .Cascade(CascadeMode.Stop)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.");
    }
}
