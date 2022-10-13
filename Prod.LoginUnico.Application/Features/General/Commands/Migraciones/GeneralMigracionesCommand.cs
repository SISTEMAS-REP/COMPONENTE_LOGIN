using AutoMapper;
using MediatR;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrappers;
using Prod.LoginUnico.Application.Features.General.Commands.Sunat;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Application.Features.General.Commands.Migraciones;

public class GeneralMigracionesCommand
    : IRequest<Response<GeneralMigracionesResponse>>
{
    public string? documentNumber { get; set; }
}

public class GeneralMigracionesCommandHandler
    : IRequestHandler<GeneralMigracionesCommand, Response<GeneralMigracionesResponse>>
{
    private readonly IPersonasServicio _personasService;
    private readonly IMigracionesServicio _migracionesService;
    private readonly IMapper _mapper;

    public GeneralMigracionesCommandHandler(IPersonasServicio personasService,
                                            IMigracionesServicio migracionesService,
                                            IMapper mapper)
    {
        _migracionesService = migracionesService;
        _personasService = personasService;
        _mapper = mapper;
    }

    public async Task<Response<GeneralMigracionesResponse>>
        Handle(GeneralMigracionesCommand request,
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
            // Buscar info en MIGRACIONES
            var migracionesResponse = _migracionesService
                .Buscar(request.documentNumber!);

            // Si no existe info en MIGRACIONES
            if (migracionesResponse is null
                || !migracionesResponse.Success
                || migracionesResponse.Data is null)
            {
                throw new NotFoundException("");
            }

            // Volver a buscar info en la base de datos
            personResponse = _personasService
            .ObtenerPersona(new()
            {
                nro_documento = request.documentNumber,
            });

            // Si aún no hay info en la base de datos
            if (personResponse is null
            || personResponse.Data is null)
            {
                throw new NotFoundException("");
            }

        }

        // Mapeo de campos
        var result = _mapper
                .Map<GeneralMigracionesResponse>(personResponse.Data);

        return await Task
            .FromResult(new Response<GeneralMigracionesResponse>()
            {
                Succeeded = true,
                Data = result
            });
    }
}
