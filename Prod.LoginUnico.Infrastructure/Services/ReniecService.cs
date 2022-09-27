using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Models;
using Prod.ServiciosExternos;
using Prod.ServiciosExternos.Entidades;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Infrastructure.Services;

public class ReniecService : IReniecService
{
	private readonly IReniecServicio _reniecServicio;

	public ReniecService(IReniecServicio reniecServicio)
	{
		_reniecServicio = reniecServicio;
	}

	public async Task<ReniecResultModel?>
		FindByDocument(string documentNumber)
	{
        var response = _reniecServicio
            .Buscar(dni: documentNumber);

        if (response == null
            || !response.Success)
        {
            return null;
        }

        var data = response.Data;

        return await Task
            .FromResult(new ReniecResultModel()
            {
                documentNumber = data.dni,
                lastName = $"{data.apellidoPaterno} " +
                $"{data.apellidoMaterno}",
                firstName = data.nombre,

                departmentCode = data.codigoDepartamento,
                department = data.departamento, //
                provinceCode = data.codigoProvincia,
                province = data.provincia, //
                districtCode = data.codigoDistrito,
                district = data.distrito,  //
                ubigeoCode = data.CODIGO_UGIGEO,
                address = data.direccion,

                dateOfBirth = data.fechaNacimiento, //
                restrictionCode = data.CODIGO_RESTRICCION, //
                genderCode = data.codigoGenero, //
                gender = data.genero, //
                maritalStatusCode = data.codigoEstadoCivil, //
                maritalStatus = data.estadoCivil //
            });
    }

    //StatusResponse<BuscarPersonaResponse> Buscar(string dni);
}
