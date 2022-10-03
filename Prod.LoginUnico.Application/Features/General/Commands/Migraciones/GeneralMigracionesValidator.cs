using FluentValidation;

namespace Prod.LoginUnico.Application.Features.General.Commands.Migraciones;

public class GeneralMigracionesValidator 
    : AbstractValidator<GeneralMigracionesCommand>
{
    public GeneralMigracionesValidator()
    {
        RuleFor(p => p.documentNumber)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.");
    }
}
