using MediatR;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Abstractions.Managers;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Application.Features.Account.Commands.UpdateExtranetAccount;

public class UpdateExtranetAccountHandler
    : IRequestHandler<UpdateExtranetAccountCommand>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IExtranetUserManager _extranetUserManager;
    private readonly IPersonasServicio _personasServicio;
    private readonly AppSettings _options;

    public UpdateExtranetAccountHandler(ICurrentUserService currentUserService,
        IExtranetUserManager extranetUserManager,
        IPersonasServicio personasServicio,
        IOptions<AppSettings> options)
    {
        _currentUserService = currentUserService;
        _extranetUserManager = extranetUserManager;
        _personasServicio = personasServicio;
        _options = options.Value;
    }

    public async Task<Unit>
        Handle(UpdateExtranetAccountCommand request,
               CancellationToken cancellationToken)
    {
        // Fecha y hora en la que se realiza la transacción
        var operationDateTime = DateTime.Now;

        var userId = _currentUserService.User?.UserId;
        if (string.IsNullOrEmpty(userId))
        {
            throw new ForbiddenAccessException("Authentication user not found.");
        }

        // Buscar usuario
        var user = await _extranetUserManager
            .FindByIdAsync(userId);

        if (user is null)
        {
            throw new BadRequestException("User not found.");
        }

        // Actualizar datos en persona
        var personId = user.id_persona_juridica > 0
            ? user.id_persona_juridica
            : user.id_persona_natural;

        var updateResponse = _personasServicio
            .ActualizarPersonaById(new()
            {
                id = personId,

                celular = request.PhoneNumber!,
                email = request.Email!,

                usuario = _options?.UserAudit?.UserName!,
                usuario_mod = _options?.UserAudit?.UserName!,
                fecha_mod = operationDateTime
            });

        if (updateResponse is null
            || !updateResponse.Success
            || StringToInt(updateResponse.Value) <= 0)
        {
            throw new ApiException("Ocurrió un problema para actualizar su información. " +
                "Inténtelo nuevamente.");
        }

        // Actualizar datos en usuario
        user.phone_number = request.PhoneNumber;
        user.email = request.Email!;

        var result = await _extranetUserManager
            .UpdateAsync(user);

        if (result.errors is not null)
        {
            throw new BadRequestException(result.errors);
        }

        return Unit.Value;
    }

    private static int StringToInt(string? stringValue)
    {
        return int.TryParse(stringValue, out int intValue)
            ? intValue
            : default;
    }
}