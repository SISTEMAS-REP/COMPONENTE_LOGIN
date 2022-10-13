using AutoMapper;
using MediatR;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrappers;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Application.Features.General.Commands.Reniec;

public class GeneralReniecCommand
    : IRequest<Response<GeneralReniecResponse>>
{
    public string? documentNumber { get; set; }
}

public class GeneralReniecCommandHandler
    : IRequestHandler<GeneralReniecCommand, Response<GeneralReniecResponse>>
{
    private readonly IPersonasServicio _personasService;
    private readonly IReniecServicio _reniecService;
    private readonly IMapper _mapper;

    public GeneralReniecCommandHandler(IPersonasServicio personasService,
                                       IReniecServicio reniecService,
                                       IMapper mapper)
    {
        _reniecService = reniecService;
        _personasService = personasService;
        _mapper = mapper;
    }

    public async Task<Response<GeneralReniecResponse>>
        Handle(GeneralReniecCommand request,
               CancellationToken cancellationToken)
    {
        // Buscar info en la base de datos
        var personResponse = _personasService
            .ObtenerPersona(new()
            {
                nro_documento = request.documentNumber,
            });

        // Si no existe info en la base de datos
        if (personResponse is null
            || personResponse.Data is null)
        {
            // Buscar info en RENIEC
            var reniecResponse = _reniecService
                .Buscar(request.documentNumber!);

            // Si no existe info en RENIEC
            if (reniecResponse is null
                || !reniecResponse.Success
                || reniecResponse.Data is null)
            {
                throw new NotFoundException("Ocurrió un problema al validar el número de ruc ingresado, " +
                    "verifique e inténtelo nuevamente");
            }

            // Volver a buscar info en la base de datos
            personResponse = _personasService
            .ObtenerPersona(new()
            {
                nro_documento = reniecResponse.Data.dni,
            });

            // Si aún no hay info en la base de datos
            if (personResponse is null
            || personResponse.Data is null)
            {
                throw new NotFoundException("Ocurrió un problema al validar el número de ruc ingresado, " +
                    "verifique e inténtelo nuevamente");
            }
        }

        // Mapeo de campos
        var result = _mapper
                .Map<GeneralReniecResponse>(personResponse.Data);

        return await Task
            .FromResult(new Response<GeneralReniecResponse>()
            {
                Succeeded = true,
                Data = result
            });
    }
}