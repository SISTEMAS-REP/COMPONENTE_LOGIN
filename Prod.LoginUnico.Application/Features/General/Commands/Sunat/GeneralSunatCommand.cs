using AutoMapper;
using MediatR;
using Prod.LoginUnico.Application.Common.Exceptions;
using Prod.LoginUnico.Application.Common.Wrapper;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Application.Features.General.Commands.Sunat;

public class GeneralSunatCommand 
    : IRequest<Response<GeneralSunatResponse>>
{
    public string? RucNumber { get; set; }
}

public class GeneralSunatCommandHandler
    : IRequestHandler<GeneralSunatCommand, Response<GeneralSunatResponse>>
{
    private readonly IPersonasServicio _personasService;
    private readonly ISunatServicio _sunatService;
    private readonly IMapper _mapper;

    public GeneralSunatCommandHandler(IPersonasServicio personasService, 
                                      ISunatServicio sunatService,
                                      IMapper mapper)
    {
        _sunatService = sunatService;
        _personasService = personasService;
        _mapper = mapper;
    }

    public async Task<Response<GeneralSunatResponse>>
        Handle(GeneralSunatCommand request,
               CancellationToken cancellationToken)
    {
        // Buscar info en la base de datos
        var personResponse = _personasService
            .ObtenerPersona(new()
            {
                nro_documento = request.RucNumber,
            });

        // Si no existe info en la base de datos
        if (personResponse is null
            || personResponse.Data is null)
        {
            // Buscar info en SUNAT
            var sunatResponse = _sunatService
                .Buscar(request.RucNumber!);

            // Si no existe info en SUNAT
            if (sunatResponse is null
                || !sunatResponse.Success
                || sunatResponse.Data is null)
            {
                /*Ocurrió un problema al validar el documento ingresado, verifique e inténtelo nuevamente*/
                throw new NotFoundException("");
            }

            // Volver a buscar info en la base de datos
            personResponse = _personasService
            .ObtenerPersona(new()
            {
                nro_documento = sunatResponse.Data.numeroRuc,
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
                .Map<GeneralSunatResponse>(personResponse.Data);

        return await Task
            .FromResult(new Response<GeneralSunatResponse>()
            {
                Succeeded = true,
                Data = result
            });
    }
}