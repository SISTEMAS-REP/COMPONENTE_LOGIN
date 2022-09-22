using FluentValidation;

namespace Prod.LoginUnico.Application.Features.External.Queries.Logo;

public class ExternalLogoValidator : AbstractValidator<ExternalLogoQuery>
{
    public ExternalLogoValidator()
    {
        RuleFor(p => p.id_aplicacion)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.");
    }
}
