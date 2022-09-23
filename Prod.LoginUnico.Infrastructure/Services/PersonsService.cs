using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Infrastructure.Services;

public class PersonsService : IPersonsService
{
    private readonly IPersonasServicio _personasServicio;
    private readonly AppSettings _options;

    public PersonsService(IPersonasServicio personasServicio, IOptions<AppSettings> options)
	{
		_personasServicio = personasServicio;
        _options = options.Value;
    }

	public async Task<int> InsertOrUpdatePerson(ExtranetRegisterCommand request)
	{
        int personId;

        if (request.Id > 0)
        {
            var updateResponse = _personasServicio.ActualizarPersonaById(new()
            {
                id = request.Id,
                codigo_departamento = request.CodigoDepartamento,
                codigo_provincia = request.CodigoProvincia,
                codigo_distrito = request.CodigoDistrito,
                direccion = request.Direccion,
                telefono = stringTransform(request.Telefono),
                email = stringTransform(request.Email),
                celular = stringTransform(request.Celular),
                nro_docpernatural = request.NroDocPerNatural,

                usuario = _options.UserAudit.UserName
            });

            personId = stringToInt(updateResponse.Value);
        }
        else
        {
            var insertResponse = _personasServicio.RegistrarAdministrado(new()
            {
                id_sector = request.IdSector,
                id_tipo_persona = request.IdTipoPersona,
                codigo_departamento = request.CodigoDepartamento,
                codigo_provincia = request.CodigoProvincia,
                codigo_distrito = request.CodigoDistrito,
                id_tipo_identificacion = request.IdTipoIdentificacion,
                razon_social = stringTransform(request.RazonSocial, "-"),
                nombres = stringTransform(request.Nombres, "-"),
                apellidos = stringTransform(request.Apellidos, "-"),
                nro_documento = request.NroDocumento,
                direccion = request.Direccion,
                telefono = stringTransform(request.Telefono),
                email = stringTransform(request.Email),
                flag = request.Flag,
                usuario = _options.UserAudit.UserName,
                celular = stringTransform(request.Celular),
                representante_legal = "",
                nro_documento_representante = "",
                nro_docpernatural = request.NroDocPerNatural
            });

            personId = stringToInt(insertResponse.Value);
        }

        return await Task.FromResult(personId);
    }

    private string stringTransform(string? value, string defaultValue = "")
    {
        return !string.IsNullOrEmpty(value) ? value : defaultValue;
    }

    private int stringToInt(string? stringValue)
    {
        return int.TryParse(stringValue, out int intValue)
            ? intValue
            : default(int);
    }
}
