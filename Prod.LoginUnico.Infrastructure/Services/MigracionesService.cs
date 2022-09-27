using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Models;
using Prod.ServiciosExternos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Infrastructure.Services;

public class MigracionesService : IMigracionesService
{
    private readonly IMigracionesServicio _migracionesService;

    public MigracionesService(IMigracionesServicio migracionesService)
    {
        _migracionesService = migracionesService;
    }

    public async Task<MigracionesResultModel?>
        FindByDocument(string documentNumber)
    {
        var response = _migracionesService
            .Buscar(dni: documentNumber);

        if (response == null
            || !response.Success)
        {
            return null;
        }

        var data = response.Data;

        return await Task
            .FromResult(new MigracionesResultModel()
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
}