using FluentValidation;

namespace Prod.LoginUnico.Application.Features.General.Commands.Reniec;

public class GeneralReniecValidator : AbstractValidator<GeneralReniecCommand>
{
    public GeneralReniecValidator()
    {
        RuleFor(p => p.documentNumber)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.");
    }
}
