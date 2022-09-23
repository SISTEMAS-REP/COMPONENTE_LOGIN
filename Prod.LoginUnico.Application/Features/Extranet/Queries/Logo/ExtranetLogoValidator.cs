using FluentValidation;

namespace Prod.LoginUnico.Application.Features.Extranet.Queries.Logo;

public class ExtranetLogoValidator : AbstractValidator<ExtranetLogoQuery>
{
    public ExtranetLogoValidator()
    {
        RuleFor(p => p.id_aplicacion)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.");
    }
}
