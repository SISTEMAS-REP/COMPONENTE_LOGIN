using FluentValidation;

namespace Prod.LoginUnico.Application.Features.General.Queries.Logo;

public class GeneralLogoValidator : AbstractValidator<GeneralLogoQuery>
{
    public GeneralLogoValidator()
    {
        RuleFor(p => p.applicationId)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.");
    }
}
