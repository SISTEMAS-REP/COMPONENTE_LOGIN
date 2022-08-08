using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Core.Aplicacion.Interfaces.Comando;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.Persona;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;
using Prod.ServiciosExternos;
using sep = Prod.ServiciosExternos.Personas;
using Prod.VUSP.Entidades.PortalEnlace;

namespace Prod.VUSP.Core.Controllers.Comandos
{
	//[ApiController]
	[Route("[controller]")]
	public class ComunComandoController : ControllerBase
	{
		private readonly IPersonasServicio personasServicio;
		private readonly IUnitOfWork unitOfWork;

		public ComunComandoController(IPersonasServicio personasServicio, IUnitOfWork unitOfWork)
		{
			this.personasServicio = personasServicio;
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("RegistrarModificarPersonaEmpresa")]
		public StatusResponse<PersonaResponse> RegistrarModificarPersonaEmpresa([FromBody] PersonaRequest request)
		{
			var sr = new StatusResponse<PersonaResponse>();
			var resPersona = new sep.StatusResponse();
			sep.PersonaRequest persona = null;
			if (request.Id == 0)
			{
				persona = new sep.PersonaRequest()
				{
					id_sector = request.IdSector,
					id_tipo_persona = request.IdTipoPersona,
					codigo_departamento = request.CodigoDepartamento,
					codigo_provincia = request.CodigoProvincia,
					codigo_distrito = request.CodigoDistrito,
					id_tipo_identificacion = request.IdTipoIdentificacion,
					razon_social = !string.IsNullOrEmpty(request.RazonSocial) ? request.RazonSocial : "-",
					nombres = !string.IsNullOrEmpty(request.Nombres) ? request.Nombres : "-",
					apellidos = !string.IsNullOrEmpty(request.Apellidos) ? request.Apellidos : "-",
					nro_documento = request.NroDocumento,
					direccion = request.Direccion,
					telefono = string.IsNullOrEmpty(request.Telefono) ? "" : request.Telefono,
					email = string.IsNullOrEmpty(request.Email) ? "" : request.Email,
					flag = request.Flag,
					usuario = "VUSP",
					celular = string.IsNullOrEmpty(request.Celular) ? "" : request.Celular,
					representante_legal = "",
					nro_documento_representante = "",
					nro_docpernatural = request.NroDocPerNatural
				};
				resPersona = personasServicio.RegistrarAdministrado(persona);
			}
			else
			{
				persona = new sep.PersonaRequest()
				{
					id = request.Id,
					codigo_departamento = request.CodigoDepartamento,
					codigo_provincia = request.CodigoProvincia,
					codigo_distrito = request.CodigoDistrito,
					direccion = request.Direccion,
					telefono = string.IsNullOrEmpty(request.Telefono) ? "" : request.Telefono,
					email = string.IsNullOrEmpty(request.Email) ? "" : request.Email,
					celular = string.IsNullOrEmpty(request.Celular) ? "" : request.Celular,
					nro_docpernatural = request.NroDocPerNatural,
					usuario = "VUSP"
				};
				resPersona = personasServicio.ActualizarPersonaById(persona);
			}
			if (resPersona.Success)
			{
				sr.Success = resPersona.Success;
				sr.Data = new PersonaResponse
				{
					Id = int.Parse(resPersona.Value)
				};
			}
			return sr;
		}

		[HttpPost]
		[Route("SumarClickConsultasLinea")]
		public StatusResponse SumarClickConsultasLinea([FromBody] PortalEnlaceResponse request)
		{
			var sr = new StatusResponse();
			var result = this.unitOfWork.p_Actualizar_orden_click(request.IdPortalEnlace);
			sr.Data = result.Data;
			return sr;
		}
	}
}

