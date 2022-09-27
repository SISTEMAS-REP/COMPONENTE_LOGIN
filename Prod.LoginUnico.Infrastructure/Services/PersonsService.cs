using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;
using Prod.ServiciosExternos;

namespace Prod.LoginUnico.Infrastructure.Services;

public class PersonsService : IPersonsService
{
    private readonly IPersonasServicio _personasServicio;

    public PersonsService(IPersonasServicio personasServicio)
	{
		_personasServicio = personasServicio;
    }

	public async Task<int> 
        InsertOrUpdatePerson(ExtranetRegisterCommand request, UserAudit userAudit)
	{
        int personId;

        if (request.personId > 0)
        {
            var updateResponse = _personasServicio.ActualizarPersonaById(new()
            {
                id = request.personId ?? 0,

                nro_docpernatural = request.documentNumber, // ???
                codigo_departamento = request.departmentCode,
                codigo_provincia = request.provinceCode,
                codigo_distrito = request.districtCode,
                direccion = request.address,

                //telefono = StringTransform(request.Telefono),
                email = StringTransform(request.email),
                celular = StringTransform(request.phoneNumber),

                usuario = userAudit.UserName
            });

            personId = StringToInt(updateResponse.Value);
        }
        else
        {
            var insertResponse = _personasServicio.RegistrarAdministrado(new()
            {
                id_sector = request.sectorId ?? 0,
                id_tipo_persona = request.personType ?? 0,

                nro_documento = request.documentNumber,
                razon_social = StringTransform(request.businessName, "-"),
                codigo_departamento = request.departmentCode,
                codigo_provincia = request.provinceCode,
                codigo_distrito = request.districtCode,
                direccion = request.address,

                id_tipo_identificacion = request.documentType ?? 0,
                nro_docpernatural = request.documentNumber,
                apellidos = StringTransform(request.lastName, "-"),
                nombres = StringTransform(request.firstName, "-"),

                //telefono = StringTransform(request.Telefono),
                celular = StringTransform(request.phoneNumber),
                email = StringTransform(request.email),
                
                //flag = request.Flag,
                flag = "A",
                usuario = userAudit.UserName,
                //representante_legal = "",
                //nro_documento_representante = "",
            });

            personId = StringToInt(insertResponse.Value);
        }

        return await Task.FromResult(personId);
    }

    private string StringTransform(string? value, string defaultValue = "")
    {
        return !string.IsNullOrEmpty(value) ? value : defaultValue;
    }

    private int StringToInt(string? stringValue)
    {
        return int.TryParse(stringValue, out int intValue)
            ? intValue
            : default(int);
    }
}
