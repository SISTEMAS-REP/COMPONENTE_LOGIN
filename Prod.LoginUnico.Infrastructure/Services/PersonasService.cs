using Prod.LoginUnico.Application.Abstractions.Services;
using Prod.LoginUnico.Application.Models.Services;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Infrastructure.Services;

public class PersonasService : IPersonasService
{
    private readonly IPersonasServicio _personasServicio;

    public PersonasService(IPersonasServicio personasServicio)
	{
		_personasServicio = personasServicio;
    }

    public async Task<PersonasServiceResponse?>
        FindPerson(string documentNumber)
    {
        var response = _personasServicio
            .ObtenerPersona(new()
            {
                nro_documento = documentNumber
            });

        if (!response.Success || response.Data is null)
        {
            return null;
        }

        return await Task.FromResult(new PersonasServiceResponse()
        {
            id = response.Data.id_persona,
            id_tipo_identificacion = response.Data.id_tipo_identificacion,
            nro_documento = response.Data.nro_documento,
            id_tipo_persona = response.Data.id_tipo_persona,
            razon_social = response.Data.razon_social,
            nombres = response.Data.nombres,
            apellidos = response.Data.apellidos,
            direccion = response.Data.direccion,
            codigo_departamento = response.Data.codigo_departamento,
            codigo_provincia = response.Data.codigo_provincia,
            codigo_distrito = response.Data.codigo_distrito,
        });
    }

    public async Task<PersonasServiceResponse?>
        FindNaturalPerson(string documentNumber)
    {
        var response = _personasServicio
            .ObtenerPersona(new()
        {
            nro_documento = documentNumber
        });

        if (!response.Success || response.Data is null)
        {
            return null;
        }

        return await Task.FromResult(new PersonasServiceResponse()
        {
            id = response.Data.id_persona,
            id_tipo_identificacion = response.Data.id_tipo_identificacion,
            nro_documento = response.Data.nro_documento,
            id_tipo_persona = response.Data.id_tipo_persona,
            razon_social = response.Data.razon_social,
            nombres = response.Data.nombres,
            apellidos = response.Data.apellidos,
            direccion = response.Data.direccion,
            codigo_departamento = response.Data.codigo_departamento,
            codigo_provincia = response.Data.codigo_provincia,
            codigo_distrito = response.Data.codigo_distrito,
        });
    }

    public async Task<PersonasServiceResponse?>
        FindLegalPerson(string rucNumber)
    {
        var response = _personasServicio
            .ObtenerPersona(new(){
                nro_documento = rucNumber
            });

        if (!response.Success || response.Data is null)
        {
            return null;
        }

        return await Task.FromResult(new PersonasServiceResponse()
        {
            id = response.Data.id_persona,
            id_tipo_identificacion = response.Data.id_tipo_identificacion,
            id_tipo_persona = response.Data.id_tipo_persona,
            nro_documento = response.Data.nro_documento,
            razon_social = response.Data.razon_social,
            nombres = response.Data.nombres,
            apellidos = response.Data.apellidos,
            direccion = response.Data.direccion,
            codigo_departamento = response.Data.codigo_departamento,
            codigo_provincia = response.Data.codigo_provincia,
            codigo_distrito = response.Data.codigo_distrito,
        });
    }

    public async Task<int>
        UpsertLegalPerson(PersonasServiceRequest request)
    {
        int personId;

        if (request.id > 0)
        {
            var updateResponse = _personasServicio
                .ActualizarPersonaById(new()
                {
                    id = request.id,

                    email = StringTransform(request.email),
                    celular = StringTransform(request.celular),

                    usuario = request.usuario,
                    usuario_mod = request.usuario_mod,
                    fecha_mod = request.fecha_mod
                });

            personId = StringToInt(updateResponse.Value);
        }
        else
        {
            var insertResponse = _personasServicio
                .RegistrarAdministrado(new()
                {
                    id_sector = request.id_sector,
                    id_tipo_persona = request.id_tipo_persona,

                    codigo_departamento = request.codigo_departamento,
                    codigo_provincia = request.codigo_provincia,
                    codigo_distrito = request.codigo_distrito,

                    id_tipo_identificacion = request.id_tipo_identificacion,
                    razon_social = StringTransform(request.razon_social, "-"),
                    nro_documento = request.nro_documento,

                    direccion = request.direccion,

                    email = StringTransform(request.email),

                    flag = "A",
                    usuario = request.usuario,

                    celular = StringTransform(request.celular),
                });

            personId = StringToInt(insertResponse.Value);
        }

        return await Task.FromResult(personId);
    }

    public async Task<int>
        UpsertNaturalPerson(PersonasServiceRequest request)
    {
        int personId;

        if (request.id > 0)
        {
            var updateResponse = _personasServicio
                .ActualizarPersonaById(new()
                {
                    id = request.id,

                    codigo_departamento = request.codigo_departamento,
                    codigo_provincia = request.codigo_provincia,
                    codigo_distrito = request.codigo_distrito,

                    direccion = request.direccion,

                    email = StringTransform(request.email),
                    celular = StringTransform(request.celular),

                    usuario = request.usuario,
                    usuario_mod = request.usuario_mod,
                    fecha_mod = request.fecha_mod
                });

            personId = StringToInt(updateResponse.Value);
        }
        else
        {
            var insertResponse = _personasServicio
                .RegistrarAdministrado(new()
                {
                    id_sector = request.id_sector,
                    id_tipo_persona = request.id_tipo_persona,

                    codigo_departamento = request.codigo_departamento,
                    codigo_provincia = request.codigo_provincia,
                    codigo_distrito = request.codigo_distrito,

                    id_tipo_identificacion = request.id_tipo_identificacion,
                    razon_social = StringTransform(request.razon_social, "-"),
                    nro_documento = request.nro_documento,

                    direccion = request.direccion,

                    email = StringTransform(request.email),

                    nro_docpernatural = request.nro_docpernatural,
                    apellidos = StringTransform(request.apellidos, "-"),
                    nombres = StringTransform(request.nombres, "-"),

                    flag = "A",
                    usuario = request.usuario,

                    celular = StringTransform(request.celular),
                });

            personId = StringToInt(insertResponse.Value);
        }

        return await Task.FromResult(personId);
    }

    private static string StringTransform(string? value, string defaultValue = "")
    {
        return !string.IsNullOrEmpty(value) ? value : defaultValue;
    }

    private static int StringToInt(string? stringValue)
    {
        return int.TryParse(stringValue, out int intValue)
            ? intValue
            : default;
    }
}
