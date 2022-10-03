﻿using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.LoginUnico.Application.Models.Services;

namespace Prod.LoginUnico.Application.Abstractions.Services;

public interface IPersonasService
{
    Task<PersonasServiceResponse?>
        FindNaturalPerson(string documentNumber);

    Task<PersonasServiceResponse?>
        FindLegalPerson(string rucNumber);

    Task<int>
        UpsertLegalPerson(PersonasServiceRequest request);

    Task<int>
        UpsertNaturalPerson(PersonasServiceRequest request);
}