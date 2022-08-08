
using Microsoft.AspNetCore.Mvc;
using se = Prod.ServiciosExternos;
using Prod.VUSP.Core.Aplicacion.Interfaces.Consulta;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;
using Prod.ServiciosExternos;
using Prod.VUSP.Entidades.Persona;
using Prod.VUSP.Entidades;
using Prod.VUSP.Entidades.AplicacionExtranet;
using Prod.VUSP.Datos;
using Release.Helper.Pagination;
using Prod.VUSP.Entidades.BusquedadGeneral;
using Prod.VUSP.Entidades.EntidadPrincipal;
using Prod.ServiciosExternos.Dependencia;
using Prod.VUSP.Entidades.Dependencia;
using DependenciaResponse = Prod.VUSP.Entidades.Dependencia.DependenciaResponse;
using Prod.VUSP.Entidades.ClaseDocumento;
using Prod.VUSP.Entidades.AplicacionUsuario;
using Prod.VUSP.Entidades.Consentimiento;
using Prod.VUSP.Entidades.Usuario;
using Prod.VUSP.Entidades.UserInformation;
using Prod.ServiciosExternos.SNE;
using StatusResponse = Release.Helper.StatusResponse;
using System.Linq;

namespace Prod.VUSP.Core.Controllers.Consultas
{
	//[ApiController]
	[Route("[controller]")]
	public class ComunConsultaController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;
		private readonly IComunAplicacion comunAplicacion;
		private readonly ISunatServicio sunatServicio;
		private readonly IReniecServicio reniecServicio;
		private readonly IUbigeoServicio ubigeoServicio;
		private readonly IPersonasServicio personasServicio;
		private readonly ISneServicio sneServicio;
		private readonly IDomicilioElectronicoServicio domicilioElectronicoServicio;

		public ComunConsultaController(IComunAplicacion comunAplicacion,
			ISunatServicio sunatServicio,
			IReniecServicio reniecServicio,
			IUbigeoServicio ubigeoServicio,
			IPersonasServicio personasServicio,
			ISneServicio sneServicio,
			IDomicilioElectronicoServicio domicilioElectronicoServicio,
			IUnitOfWork unitOfWork)
		{
			this.comunAplicacion = comunAplicacion;
			this.sunatServicio = sunatServicio;
			this.reniecServicio = reniecServicio;
			this.ubigeoServicio = ubigeoServicio;
			this.personasServicio = personasServicio;
			this.sneServicio = sneServicio;
			this.domicilioElectronicoServicio = domicilioElectronicoServicio;
			this.unitOfWork = unitOfWork;
		}

		[HttpPost]
		[Route("BuscarPersonaEmpresa")]
		public StatusResponse<PersonaResponse> BuscarPersonaEmpresa([FromBody] PersonaRequest request)
		{
			var sr = new StatusResponse<PersonaResponse>();
			var persona = personasServicio.ObtenerPersona(new se.Personas.PersonaGeneralRequest
			{
				nro_documento = request.NroDocumento
			});
			if (persona.Success && persona.Data?.id_persona > 0)
			{
				sr.Success = true;
				sr.Data = new PersonaResponse()
				{
					Id = persona.Data.id_persona,
					IdTipoIdentificacion = persona.Data.id_tipo_identificacion,
					IdTipoPersona = persona.Data.id_tipo_persona,					
					RazonSocial = persona.Data.razon_social,
					Nombres = persona.Data.nombres,
					Apellidos = persona.Data.apellidos,
					Direccion = persona.Data.direccion,
					CodigoDepartamento = persona.Data.codigo_departamento,
					CodigoProvincia = persona.Data.codigo_provincia,
					CodigoDistrito = persona.Data.codigo_distrito,
					Email = persona.Data.email,
					Celular = persona.Data.celular
				};
				return sr;
			}
			//Validar Sunat
			if (request.IdTipoIdentificacion == (int)TIPO_DOCUMENTO_PERSONA.RUC)
			{
				
				var data = sunatServicio.Buscar(request.NroDocumento);
				if (data.Success)
				{
					sr.Success = true;
					sr.Data = new PersonaResponse()
					{
						//EsValidoReniec = true,
						RazonSocial = data.Data.razonSocial,
						Direccion = string.IsNullOrEmpty(data.Data.domicilio) ? "-" : data.Data.domicilio,
						CodigoDepartamento = string.IsNullOrEmpty(data.Data.departamento) ? "00" : data.Data.departamento,
						CodigoProvincia = string.IsNullOrEmpty(data.Data.departamento) ? "00" : (string.IsNullOrEmpty(data.Data.provincia) ? "00" : (data.Data.provincia.Substring(data.Data.provincia.Length - 2, 2))),
						CodigoDistrito = (string.IsNullOrEmpty(data.Data.departamento) || string.IsNullOrEmpty(data.Data.provincia)) ? "00" : (string.IsNullOrEmpty(data.Data.ubigeo) ? "00" : (data.Data.ubigeo.Substring(data.Data.ubigeo.Length - 2, 2)))
					};
					//Validar Servicio Persona
					//var respuestaAccesos = _AccesosServicio.GetAdministradoFiltros(new AccesoRequest { tipoBusqueda = 2, filtro = data.Data.numeroRuc });
					//sr.Data.IdPersona = respuestaAccesos.userName;
				}
			}
			//Validar Reniec
			else if (request.IdTipoIdentificacion == (int)TIPO_DOCUMENTO_PERSONA.DNI)
			{
				var data = reniecServicio.Buscar(request.NroDocumento);
				if (data.Success)
				{
					sr.Success = true;
					sr.Data = new PersonaResponse()
					{
						//EsValidoReniec = true,
						Nombres = data.Data.nombre,
						Apellidos = (data.Data.apellidoPaterno + " " + data.Data.apellidoMaterno ?? "").Trim(),
						Direccion = string.IsNullOrEmpty(data.Data.direccion) ? "-" : data.Data.direccion,
						CodigoDepartamento = string.IsNullOrEmpty(data.Data.codigoDepartamento) ? "00" : data.Data.codigoDepartamento,
						CodigoProvincia = string.IsNullOrEmpty(data.Data.codigoDepartamento) ? "00" : (string.IsNullOrEmpty(data.Data.codigoProvincia) ? "00" : (data.Data.codigoProvincia.Substring(data.Data.codigoProvincia.Length - 2, 2))),
						CodigoDistrito = (string.IsNullOrEmpty(data.Data.codigoDistrito) || string.IsNullOrEmpty(data.Data.codigoProvincia)) ? "00" : (string.IsNullOrEmpty(data.Data.codigoDistrito) ? "00" : (data.Data.codigoDistrito.Substring(data.Data.codigoDistrito.Length - 2, 2)))
					};
					//Validar Servicio Persona
					//var respuestaAccesos = _AccesosServicio.GetAdministradoFiltros(new AccesoRequest { tipoBusqueda = 2, filtro = data.Data.dni });
					//sr.Data.IdPersona = respuestaAccesos.userName;
				}
			}
			return sr;
		}

		[HttpPost]
		[Route("ObtenerPersona")]
		public StatusResponse<PersonaResponse> ObtenerPersona([FromBody] PersonaRequest request)
		{
			var sr = new StatusResponse<PersonaResponse>();
			var persona = personasServicio.ObtenerPersona(new se.Personas.PersonaGeneralRequest
			{
				nro_documento = request.NroDocumento
			});
			if (persona.Success && persona.Data?.id_persona > 0)
			{
				sr.Success = true;
				sr.Data = new PersonaResponse()
				{
					Id = persona.Data.id_persona,
					IdTipoIdentificacion = persona.Data.id_tipo_identificacion,
					IdTipoPersona = persona.Data.id_tipo_persona,
					RazonSocial = persona.Data.razon_social,
					Nombres = persona.Data.nombres,
					Apellidos = persona.Data.apellidos,
					Direccion = persona.Data.direccion,
					CodigoDepartamento = persona.Data.codigo_departamento,
					CodigoProvincia = persona.Data.codigo_provincia,
					CodigoDistrito = persona.Data.codigo_distrito,
					Email = persona.Data.email,
					Celular = persona.Data.celular
				};
				return sr;
			}
			//Validar Sunat
			if (request.IdTipoIdentificacion == (int)TIPO_DOCUMENTO_PERSONA.RUC)
			{

				var data = sunatServicio.Buscar(request.NroDocumento);
				if (data.Success)
				{
					sr.Success = true;
					sr.Data = new PersonaResponse()
					{
						//EsValidoReniec = true,
						RazonSocial = data.Data.razonSocial,
						Direccion = string.IsNullOrEmpty(data.Data.domicilio) ? "-" : data.Data.domicilio,
						CodigoDepartamento = string.IsNullOrEmpty(data.Data.departamento) ? "00" : data.Data.departamento,
						CodigoProvincia = string.IsNullOrEmpty(data.Data.departamento) ? "00" : (string.IsNullOrEmpty(data.Data.provincia) ? "00" : (data.Data.provincia.Substring(data.Data.provincia.Length - 2, 2))),
						CodigoDistrito = (string.IsNullOrEmpty(data.Data.departamento) || string.IsNullOrEmpty(data.Data.provincia)) ? "00" : (string.IsNullOrEmpty(data.Data.ubigeo) ? "00" : (data.Data.ubigeo.Substring(data.Data.ubigeo.Length - 2, 2)))
					};
					//Validar Servicio Persona
					//var respuestaAccesos = _AccesosServicio.GetAdministradoFiltros(new AccesoRequest { tipoBusqueda = 2, filtro = data.Data.numeroRuc });
					//sr.Data.IdPersona = respuestaAccesos.userName;
				}
			}
			//Validar Reniec
			else if (request.IdTipoIdentificacion == (int)TIPO_DOCUMENTO_PERSONA.DNI)
			{
				var data = reniecServicio.Buscar(request.NroDocumento);
				if (data.Success)
				{
					sr.Success = true;
					sr.Data = new PersonaResponse()
					{
						//EsValidoReniec = true,
						Nombres = data.Data.nombre,
						Apellidos = (data.Data.apellidoPaterno + " " + data.Data.apellidoMaterno ?? "").Trim(),
						Direccion = string.IsNullOrEmpty(data.Data.direccion) ? "-" : data.Data.direccion,
						CodigoDepartamento = string.IsNullOrEmpty(data.Data.codigoDepartamento) ? "00" : data.Data.codigoDepartamento,
						CodigoProvincia = string.IsNullOrEmpty(data.Data.codigoDepartamento) ? "00" : (string.IsNullOrEmpty(data.Data.codigoProvincia) ? "00" : (data.Data.codigoProvincia.Substring(data.Data.codigoProvincia.Length - 2, 2))),
						CodigoDistrito = (string.IsNullOrEmpty(data.Data.codigoDistrito) || string.IsNullOrEmpty(data.Data.codigoProvincia)) ? "00" : (string.IsNullOrEmpty(data.Data.codigoDistrito) ? "00" : (data.Data.codigoDistrito.Substring(data.Data.codigoDistrito.Length - 2, 2)))
					};
					//Validar Servicio Persona
					//var respuestaAccesos = _AccesosServicio.GetAdministradoFiltros(new AccesoRequest { tipoBusqueda = 2, filtro = data.Data.dni });
					//sr.Data.IdPersona = respuestaAccesos.userName;
				}
			}
			return sr;
		}

		[HttpGet]
		[Route("ObtenerUbigeo")]
		public StatusResponse<string> UbigeoObtener()
		{
			var sr = new StatusResponse<string>();
			try
			{
				sr.Data = ubigeoServicio.GetUbigeoCSV().Result;
				sr.Success = true;
			}
			catch (Exception e) {
				sr.Success = false;
			}			
			return sr;
		}

		[HttpGet]
		[Route("ObtenerDependenciasPrincipales")]
		public StatusResponse<List<EntidadPrincipalResponse>> ObtenerDependenciasPrincipales()
		{
			var sr = unitOfWork.p_DependenciasPrincipales_Obtener();
			return sr;
		}

		[HttpPost]
		[Route("ObtenerDependencias")]
		public StatusResponse<List<DependenciaResponse>> ObtenerDependencias([FromBody] DependenciaRequest request)
		{
			var sr = unitOfWork.p_Dependencias_Obtener(request);
			return sr;
		}

		[HttpPost]
		[Route("ObtenerClaseDocumento")]
		public StatusResponse<List<ClaseDocumentoResponse>> ObtenerClaseDocumento([FromBody] ClaseDocumentoRequest request)
		{
			var sr = unitOfWork.p_ClaseDocumento_Listar(request);
			return sr;
		}

		[HttpPost]
		[Route("ObtenerDependenciaPorId")]
		public StatusResponse<DependenciaResponse> ObtenerDependenciaPorId([FromBody] DependenciaRequest request)
		{
			var sr = unitOfWork.p_Dependencias_ObtenerPorId(request);
			return sr;
		}

		[HttpPost]
		[Route("ObtenerAplicacionExtranet")]
		public StatusResponse<AplicacionResponse> ObtenerAplicacionExtranet([FromBody] AplicacionRequest request)
		{
			var sr = unitOfWork.p_Aplicacion_ObtenerPorId(request);
			return sr;
		}

		[HttpPost]
		[Route("ObtenerAplicacionesVuspExtranet")]
		public StatusResponse<List<AplicacionResponse>> ObtenerAplicacionesVuspExtranet([FromBody] AplicacionRequest request)
		{
			var sr = unitOfWork.p_Aplicacion_ObtenerEsVusp(request);
			return sr;
		}

		[HttpPost]
		[Route("BusquedaGeneral_Listar")]
		public PagedResponse<BusquedaGeneralResponse> BusquedaGeneral_Listar([FromBody] BusquedaGeneralRequest request)
		{
			var sr = unitOfWork.p_BusquedaGeneral_Listar(request);
			return sr;
		}

		[HttpGet]
		[Route("p_Obtener_Datos_Aplicacion_By_Usuario")]
		public StatusResponse<List<AplicacionUsuarioResponse>> p_Obtener_Datos_Aplicacion_By_Usuario([FromBody] string user_name)
		{
			var sr = unitOfWork.p_Obtener_Datos_Aplicacion_By_Usuario(user_name);
			return sr;
		}

		[HttpGet]
		[Route("ValidarEsPersonaJuridica")]
		public StatusResponse ValidarEsPersonaJuridica([FromBody] string username)
		{
			StatusResponse response = new StatusResponse();
			var result = EsPersonaJuridica(username);
			response.Data = result;
			return response;
		}

        [HttpGet]
        [Route("ValidarEstaActivoSne")]
        public StatusResponse ValidarEstaActivoSne([FromBody] UsuarioResponse request)
        {
			StatusResponse response = new StatusResponse { Success = false };
            bool esta_activo = false;
            //string nro_documento = username;
            try
            {
                if (EsPersonaJuridica(request.UserName))
                {
					esta_activo = this.domicilioElectronicoServicio.EsUnDomicilioValido(request.ruc);
					response.Data = esta_activo;
					response.Success = esta_activo;
				}
                else
                {
                    esta_activo = this.domicilioElectronicoServicio.EsUnDomicilioValido(request.dni);
					if (!string.IsNullOrEmpty(request.ruc) && !esta_activo)
                    {
						esta_activo = this.domicilioElectronicoServicio.EsUnDomicilioValido(request.ruc);
					}
					response.Data = esta_activo;
					response.Success = esta_activo;
				}
            }
            catch (Exception ex)
            {
				response.Data = false;
				response.Success = false;
			}
            return response;
        }

        private bool EsPersonaJuridica(string username)
		{
			if (username.Length > 11) return true;
			return false;
		}

		[HttpGet]
		[Route("TieneConsentimientoRegistrado")]
		public StatusResponse TieneConsentimientoRegistrado([FromBody] Prod.VUSP.Entidades.Usuario.UsuarioResponse request)
		{
			StatusResponse response = new StatusResponse();

			var recupera_Dato = unitOfWork.p_Obtener_id_usuario_extranet(request.id_persona, request.UserName);
			var dato = (UserInformationRequest)recupera_Dato.Data;
			var result = this.domicilioElectronicoServicio.TieneAvisoContenimiento(Convert.ToInt32(dato.id_usuario_extranet));
			response.Data = result;
			return response;
		}


		[HttpPost]
		[Route("GuardarConsentimiento")]
		public StatusResponse GuardarConsentimiento([FromBody] ConsentimientoRequest request)
		{
			StatusResponse response = new StatusResponse();
            try
            {
				var recupera_Dato = unitOfWork.p_Obtener_id_usuario_extranet(request.id_persona, request.user_name);
				var dato = (UserInformationRequest)recupera_Dato.Data;


				Prod.ServiciosExternos.SNE.AvisoConsentimientoRequest avisoConsentimiento = new Prod.ServiciosExternos.SNE.AvisoConsentimientoRequest();
				avisoConsentimiento.id_usuario_extranet = dato.id_usuario_extranet;
				avisoConsentimiento.user_name = request.user_name;
				avisoConsentimiento.tiene_domicilio = request.tiene_domicilio;
				avisoConsentimiento.respuesta_aviso = request.respuesta_aviso;
				avisoConsentimiento.fecha_registro = DateTime.Now;


				var result = this.domicilioElectronicoServicio.GuardarAvisoConsentimiento(avisoConsentimiento);

				response.Success = result.Success;
				response.Messages = result.Messages;


			}
            catch (Exception ex)
            {
				response.Success = false;
			}


			return response;
		}

		[HttpPost]
		[Route("ActivarCasillaElectronica")]
		public StatusResponse ActivarCasillaElectronica([FromBody] ConsentimientoRequest request)
		{
			UsuarioDomicilioResponse[] usuarios = new UsuarioDomicilioResponse[]{ };
			StatusResponse response = new StatusResponse();
			try
			{
				string numero_documento = string.Empty;

				
				if (request.es_persona_juridica)
				{
					numero_documento = request.ruc;
					usuarios = this.sneServicio.GetUsuariosDomicilioAll(request.ruc);
				}
				else
				{
					numero_documento = request.dni;
					usuarios = this.sneServicio.GetUsuariosDomicilioAll(request.dni);
                    if (!usuarios.Any())
                    {
						usuarios = this.sneServicio.GetUsuariosDomicilioAll(request.ruc);
						if (usuarios.Any()) numero_documento = request.ruc;
					}
                }

				if (usuarios.Any(e => e.dni == request.dni))
				{
					request.tiene_domicilio = false;
					request.respuesta_aviso = true;

					usuarios.Where(e => e.dni == request.dni)
							.ToList().ForEach(user =>
							{
								this.domicilioElectronicoServicio.ActivarDesactivarCuenta(numero_documento, user.id_usuario_extranet, "usr_vsp", 1, "El usuario da su consentimiento. Se activa el usuario.");
								request.id_usuario_extranet = user.id_usuario_extranet;
								GuardarConsentimiento(request);
							});
				}
				else
				{
					var recupera_Dato = unitOfWork.p_Obtener_id_usuario_extranet(request.id_persona, request.user_name);
					var dato = (UserInformationRequest)recupera_Dato.Data;

					Prod.ServiciosExternos.SNE.CrearNuevoUsuarioRequest requestnuevousuario = new Prod.ServiciosExternos.SNE.CrearNuevoUsuarioRequest();
					requestnuevousuario.id_persona = request.id_persona;
					requestnuevousuario.id_contacto_extranet = Convert.ToInt32(dato.id_usuario_extranet);
					requestnuevousuario.numero_documento = numero_documento;
					requestnuevousuario.direccion_electronica = request.correo_electronico;
					requestnuevousuario.usuario_registro = request.user_name;
					requestnuevousuario.es_representante_legal = true;
					requestnuevousuario.es_usuario_adicional = false;
					requestnuevousuario.celular = request.telefono;

					var responses = this.domicilioElectronicoServicio.CrearNuevoUsuario(requestnuevousuario);

					if (responses.Success)
					{
						request.tiene_domicilio = true;
						request.respuesta_aviso = true;
						GuardarConsentimiento(request);
						response.Data = responses;
					}
				}

				response.Success = true;
				
			}
			catch (Exception ex)
			{
				response.Success = false;
			}

			return response;
		}

		[HttpPost]
		[Route("DesactivarCasillaElectronica")]
		public StatusResponse DesactivarCasillaElectronica([FromBody] ConsentimientoRequest request)
		{
			UsuarioDomicilioResponse[] usuarios = new UsuarioDomicilioResponse[] { };
			StatusResponse response = new StatusResponse();
			try
			{
				string numero_documento = string.Empty;


				if (request.es_persona_juridica)
				{
					usuarios = this.sneServicio.GetUsuariosDomicilio(request.ruc);
				}
				else
				{
					usuarios = this.sneServicio.GetUsuariosDomicilio(request.dni);
					if (!usuarios.Any()) usuarios = this.sneServicio.GetUsuariosDomicilio(request.ruc);
				}

				var resp = this.personasServicio.ActualizarPersonaById(new Prod.ServiciosExternos.Personas.PersonaRequest
				{
					id = request.id_persona,
					codigo_departamento = request.codigo_departamento,
					codigo_provincia = request.codigo_provincia,
					codigo_distrito = request.codigo_distrito,
					direccion = request.direccion,
					usuario = "usr_siap"
				});


				if (usuarios.Any())
				{
					request.tiene_domicilio = true;
					request.respuesta_aviso = false;

					usuarios.ToList().ForEach(user => {
						this.domicilioElectronicoServicio.ActivarDesactivarCuenta(user.ruc, user.id_usuario_extranet, "usr_vusp", 2, "El usuario no da su consentimiento. Registrado a tráves de la plataforma de VUSP");
						request.id_usuario_extranet = user.id_usuario_extranet;
						GuardarConsentimiento(request);
					});
				}

				response.Success = true;

			}
			catch (Exception ex)
			{
				response.Success = false;
			}

			return response;
		}

		[HttpPost]
		[Route("p_Obtener_id_usuario_extranet")]
		public StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet([FromBody] ConsentimientoRequest request)
		{
			StatusResponse<UserInformationRequest> response = new StatusResponse<UserInformationRequest>();
			int id_persona = request.id_persona;
			string user_name = request.user_name;
			var sr = unitOfWork.p_Obtener_id_usuario_extranet(id_persona, user_name);
			response.Data = sr.Data;
			response.Success = sr.Success;
			response.Messages = sr.Messages;
			return response;
		}
	}
}
