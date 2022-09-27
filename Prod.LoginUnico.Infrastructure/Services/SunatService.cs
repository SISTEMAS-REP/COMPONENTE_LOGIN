using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Models;
using Prod.ServiciosExternos;
using Prod.ServiciosExternos.Entidades;

namespace Prod.LoginUnico.Infrastructure.Services;

public class SunatService : ISunatService
{
	private readonly ISunatServicio _sunatServicio;

	public SunatService(ISunatServicio sunatServicio)
	{
		_sunatServicio = sunatServicio;
	}

	public async Task<SunatResultModel?>
        FindByRuc(string rucNumber)
	{
		var response = _sunatServicio
			.Buscar(ruc: rucNumber);

		if (response == null 
			|| !response.Success)
		{
			return null;
		}

		var data = response.Data;

		var ubigeoCodes = SplitBySegment(response.Data.ubigeo, 2)
			.ToList();


		return await Task
			.FromResult(new SunatResultModel()
			{
				rucNumber = data.numeroRuc,
				businessName = data.razonSocial,
				comercialName = data.nombreComercial, //
				registrationDate = data.fechaInscripcion, //

				departmentCode = ubigeoCodes[0].PadRight(6, '0'),
				provinceCode = ($"{ubigeoCodes[0]}" +
					$"{ubigeoCodes[1]}").PadRight(6, '0'),
				districtCode = ($"{ubigeoCodes[0]}" +
					$"{ubigeoCodes[1]}" +
					$"{ubigeoCodes[2]}"),
				ubigeoCode = data.ubigeo,
                businessAddress = StringTransform(data.domicilio, "-"),

                status = data.Habilitado, //
				businessType = data.tipoEmpresa, //
				ciiu = data.ciiu //
			});
	}

    private string StringTransform(string? value, string defaultValue = "")
    {
        return !string.IsNullOrEmpty(value) ? value : defaultValue;
    }

    static IEnumerable<string> SplitBySegment(string str, int chunkSize)
    {
        return Enumerable.Range(0, str.Length / chunkSize)
            .Select(i => str.Substring(i * chunkSize, chunkSize));
    }

    /*public StatusResponse<SunatResponse> Buscar(string ruc)
	{
		throw new NotImplementedException();
	}

	public StatusResponse<SunatResponse> Buscar(SunatRequest request)
	{
		throw new NotImplementedException();
	}

	public StatusResponse<bool> IsRepresentanteLegal(string ruc, string tipo, string doc)
	{
		throw new NotImplementedException();
	}

	public StatusResponse<EmpresaResponse> Persona_Juridica_Sunat(string ruc)
	{
		throw new NotImplementedException();
	}*/
}
