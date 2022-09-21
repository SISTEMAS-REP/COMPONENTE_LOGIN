using FluentValidation;

namespace Prod.LoginUnico.Application.Features.ExtranetUser.Commands;

public class ExternalAuthValidator : AbstractValidator<ExternalAuthCommand>
{
    public ExternalAuthValidator()
    {
        RuleFor(p => p.username)
            .Must(c => !string.IsNullOrEmpty(c))
            .WithMessage("{PropertyName} no puede ser vacío.");

        RuleFor(p => p.password)
            .Must(c => !string.IsNullOrEmpty(c))
            .WithMessage("{PropertyName} no puede ser vacío.");
    }
}
