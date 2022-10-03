﻿using FluentValidation;

namespace Prod.LoginUnico.Application.Features.General.Commands.Sunat;

public class GeneralSunatValidator 
    : AbstractValidator<GeneralSunatCommand>
{
    public GeneralSunatValidator()
    {
        RuleFor(p => p.RucNumber)
            .NotNull()
            .WithMessage("{PropertyName} es un valor obligatorio.");
    }
}
