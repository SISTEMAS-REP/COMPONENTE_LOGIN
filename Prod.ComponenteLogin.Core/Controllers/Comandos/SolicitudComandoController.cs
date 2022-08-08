using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Datos;
using Release.Helper;
using System;
using System.Collections.Generic;
using Prod.ServiciosExternos;
using Prod.VUSP.Entidades.Solicitud;
using Prod.VUSP.Entidades.Tupa;
using System.Linq;
using Prod.VUSP.Entidades.Proceso;
using Microsoft.Extensions.Configuration;
using Prod.VUSP.Entidades.ProcesoAdjuntos;
using Prod.VUSP.Entidades.Enumerados;
using ServiceReferenceSitradoc;
using System.Threading.Tasks;
using Prod.VUSP.Entidades.ProContrata;
using System.Transactions;
using StatusResponse = Release.Helper.StatusResponse;
using Prod.ServiciosExternos.Personas;
using Prod.VUSP.Core.Aplicacion;
using Prod.VUSP.Core.Aplicacion.Interfaces.Comando;
using Serilog;
using Prod.VUSP.Entidades.Config;
using Microsoft.Extensions.Options;

namespace Prod.VUSP.Core.Controllers.Comandos
{
	[Route("[controller]")]
	public class SolicitudComandoController : ControllerBase
	{
		private readonly IPersonasServicio personasServicio;
		private readonly IUnitOfWork unitOfWork;
		private readonly IConfiguration _configuration;
		private readonly ServiciosExternos.IExpedienteSitradocServicio expedienteSitradocServicio;
		private readonly ISneServicio sneServicio;
		private readonly ServiciosExternos.SNE.IDomicilioElectronicoServicio domicilioElectronicoServicio;
		private IArchivoService archivoProxy;
		private VariablesSitradoc _variablesSitradoc;

		public SolicitudComandoController(IUnitOfWork unitOfWork
			, IPersonasServicio personasServicio
			, IConfiguration configuration
			, ServiciosExternos.IExpedienteSitradocServicio expedienteSitradocServicio
			, ISneServicio sneServicio
			, ServiciosExternos.SNE.IDomicilioElectronicoServicio domicilioElectronicoServicio
			, IArchivoService archivoProxy
			, IOptions<VariablesSitradoc> options
			)
		{
			this.personasServicio = personasServicio;
			this.unitOfWork = unitOfWork;
			_configuration = configuration;
			this.expedienteSitradocServicio = expedienteSitradocServicio;
			this.sneServicio = sneServicio;
			this.domicilioElectronicoServicio = domicilioElectronicoServicio;
			this.archivoProxy = archivoProxy;
			_variablesSitradoc = options.Value;

		}
		
		[HttpPost]
		[Route("RegistrarSolicitud")]
		public StatusResponse<SolicitudResponse> RegistrarSolicitud([FromBody] SolicitudRequest request)
		{
			var sr = new StatusResponse<SolicitudResponse>();

			if (request.IdTupa != 0)
			{
				var tupa = unitOfWork.p_Tupa_ObtenerPorId(new Entidades.Tupa.TupaRequest(){IdTupa = request.IdTupa});
				request.coddep = tupa.Data.CodigoDependencia;
			}
			else
			{
				request.coddep = request.coddep;
			}
			sr = unitOfWork.p_Solicitud_Registrar(request);

			return sr;
		}

		[HttpPost]
		[Route("ActualizarSolicitud")]
		public StatusResponse<SolicitudResponse> ActualizarSolicitud([FromBody] SolicitudRequest request)
		{
			var sr = new StatusResponse<SolicitudResponse>();

			if (request.IdTupa != 0)
			{
				var tupa = unitOfWork.p_Tupa_ObtenerPorId(new Entidades.Tupa.TupaRequest() { IdTupa = request.IdTupa });
				request.coddep = tupa.Data.CodigoDependencia;
			}
			else
			{
				request.coddep = request.coddep;
			}
			sr = unitOfWork.p_Solicitud_Modificar(request);

			return sr;
		}

		[HttpPost]
		[Route("EnviarProcesoSolicitud")]
		public async Task<StatusResponse<SolicitudResponse>> EnviarProcesoSolicitudAsync([FromBody] SolicitudNoTupaRequest request)
		{
			var sr = new StatusResponse<SolicitudResponse>();

			var datosSolicitud = unitOfWork.p_Solicitud_ObtenerPorId(new SolicitudRequest(){IdSolicitud = request.id_solicitud }).Data;
			var solicitud = new SolicitudRequest(){ coddep = datosSolicitud.CodDep, IdSolicitud = request.id_solicitud, IdPersona = datosSolicitud.IdPersona, user_modificacion = datosSolicitud.UserRegistro };

			#region Asignar Dependencia

			if (request.id_tupa.HasValue)
			{
				if (request.id_tupa.Value == 0)
				{
					var lista_validar_clase = unitOfWork.p_ClaseDocumentoDerivar_Listar();
					var validar_clase = lista_validar_clase.Data.Find(x => x.IdClaseDocumentoInterno == request.id_clase_documento);

					if (validar_clase != null)
					{
						solicitud.coddep = validar_clase.CodDependencia;
						request.no_tiene_oficina = false;
					}
					else
					{
						var lista_validar_dependencia = unitOfWork.p_ValidarDependencia_Listar();
						var validar_dependencia = lista_validar_dependencia.Data.Find(x => x.CodigoDependencia == solicitud.coddep);
						if (validar_dependencia != null)
						{
							request.no_tiene_oficina = true;
						}
					}
				}
			}
			else
			{
				var lista_validar_clase = unitOfWork.p_ClaseDocumentoDerivar_Listar();
				var validar_clase = lista_validar_clase.Data.Find(x => x.IdClaseDocumentoInterno == request.id_clase_documento);
				if (validar_clase != null)
				{
					solicitud.coddep = validar_clase.CodDependencia;
					request.no_tiene_oficina = false;
				}
				else
				{
					var lista_validar_dependencia = unitOfWork.p_ValidarDependencia_Listar();
					var validar_dependencia = lista_validar_dependencia.Data.Find(x => x.CodigoDependencia == solicitud.coddep);
					if (validar_dependencia != null)
					{
						request.no_tiene_oficina = true;
					}
				}
			}

			#endregion

			int? cod_tupa = null;
			string asunto_tupa = string.Empty;
			if (request.id_tupa.HasValue)
			{
				if (request.id_tupa.Value != 0)
				{
					cod_tupa = request.id_tupa;
					var tupa = unitOfWork.p_Tupa_ObtenerPorId(new TupaRequest(){ IdTupa = (int)cod_tupa });
					asunto_tupa = tupa.Data.Descripcion;
					request.id_clase_documento = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<int>("id_clase_documento_tupa");
					var adj = request.archivoadjuntos.OrderBy(x => x.id_requisito).FirstOrDefault();
					if (adj != null)
					{
						request.cod_gestorarchivo = adj.archivo.id;
					}
				}
			}

			#region Registrar Proceso
			var entidad = new ProcesoRequest();
			entidad.IdSolicitud = request.id_solicitud;
			entidad.Asunto = string.IsNullOrEmpty(request.asunto) ? "-" : request.asunto;
			entidad.IdClaseDocumento = request.id_clase_documento;
			entidad.CodUsuario = "VSP";
			entidad.IdTipoDocumento = request.id_tupa.HasValue ? 2 : 1;
			entidad.IdEstadoDocumento = request.no_tiene_oficina ? _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<int>("id_estado_documento_mesa_partes") :
																	 _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<int>("id_estado_documento");
			entidad.CodGestorArchivo = string.IsNullOrEmpty(request.cod_gestorarchivo) ? "-" : request.cod_gestorarchivo;
			entidad.CodDepOrigen = request.coddep_origen; 
			entidad.AceptadoAutomatico = true;
			entidad.Referencia = request.indicativo;

			var proceso = unitOfWork.p_Proceso_Registrar(entidad);

			if (request.archivoadjuntos != null)
			{
				if (request.archivoadjuntos.Count != 0)
				{
					var tipoArchivo = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<string>("id_tipo_documento");
					foreach (var item in request.archivoadjuntos)
					{
						var obj = new ProcesoAdjuntosRequest()
						{
							NombreArchivo = item.archivo.nombreOriginal,
							Mimetype = item.archivo.contentType,
							CodigoGA = item.archivo.id,
							Size = item.archivo.pesoEnBytes,
							TipoArchivo = tipoArchivo,
							IdSolicitud = request.id_solicitud,
							IdRequisito = item.id_requisito,
							DescripcionArchivo = item.nombre
						};
						var procesoAdjunto = unitOfWork.p_ProcesoAdjuntos_Registrar(obj);
					}
				}
			}
			//_unitOfWork.Guardar();
			#endregion

			#region Asignar Estado Control Pago
			var tipo_estado_documento = 0;
			var es_control_pago = request.archivoadjuntos?.FirstOrDefault(x => x.codigo_pago != "0");
			var id_estado_documento_mesa_partes = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<int>("id_estado_documento_mesa_partes");
			var id_estado_documento = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<int>("id_estado_documento");

			if (es_control_pago != null)
			{
				if (es_control_pago.codigo_pago != null)	
				{
					tipo_estado_documento = 4;
				}
				else
				{
					tipo_estado_documento = request.no_tiene_oficina ? id_estado_documento_mesa_partes : id_estado_documento;
				}
			}
			else
			{
				tipo_estado_documento = request.no_tiene_oficina ? id_estado_documento_mesa_partes : id_estado_documento;
			}
			#endregion

			request.asunto = string.IsNullOrEmpty(request.asunto) ? asunto_tupa : request.asunto;
			request.id_persona = solicitud.IdPersona;
			request.id_estado_documento = tipo_estado_documento;
			request.id_tupa = cod_tupa;
			request.cod_dependencia = solicitud.coddep;

			#region Generar Expediente
			if (!request.esProContrata)
			{
				var data = await GenerarExpediente(request);

				if (data.Success && data.Data != null)
				{
					if (data.Data.id_documento != 0 && data.Data.num_tram_documentario != null)
					{
						solicitud.NumTramiteDocumentario = data.Data.num_tram_documentario;
						solicitud.IdDocumento = data.Data.id_documento;

						solicitud.IdEstadoSolicitud = (int)(tipo_estado_documento == 4 ? ESTADO_SOLICITUD.INCOMPLETO : ESTADO_SOLICITUD.REGISTRADO);
						solicitud.IdTupa = request.id_tupa.HasValue ? request.id_tupa.Value : 0;
						//solicitud.fecha_modificacion = DateTime.Now;
						solicitud.IdAnexo = 0;
						solicitud.IdTipoTramite = (int)request.id_tipo_tramite;
						//_solicitud.Actualizar(solicitud);
						var solicitudActualizada = unitOfWork.p_Solicitud_Modificar(solicitud);
						sr.Data = solicitudActualizada.Data;
						sr.Success = true;
						//_unitOfWork.Guardar();
					}
					else
					{
						sr.Success = false;
						sr.Messages.Add("El documento no ha sido generado de manera correcta, por favor intentelo nuevamente.");
					}
				}
				else
				{
					sr.Success = false;
					sr.Messages.Add("El documento no ha sido generado correctamente.");
				}
			}
			#endregion

			return sr;
		}

		private async Task<StatusResponse<DocumentoExternoResponse>> GenerarExpediente(SolicitudNoTupaRequest request)
		{
			var sr = new StatusResponse<DocumentoExternoResponse> { Success = true };

			try
			{
				var enviar_documento = new ServiceReferenceSitradoc.DocumentoExternoRequest()
				{
					indicativo = string.IsNullOrEmpty(request.indicativo) ? "SIN INDICATIVO" : request.indicativo,
					folio = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<int>("folio"),
					asunto = request.asunto,
					coddep_destino = request.cod_dependencia,
					observaciones = "Ninguno",
					cod_usuario = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<string>("usuario"),
				    id_clase_documento = request.id_clase_documento,
					id_persona = request.id_persona,
					id_tipo_documento = request.id_tupa.HasValue ? 2 : 1,
					id_estado_documento = request.id_estado_documento,
					coddep_origen = request.coddep_origen,
					aceptado_automatico = true,
					cod_gestorarchivo = request.cod_gestorarchivo,
					id_tupa = request.id_tupa,
					referencia = request.referencia
				};
				if (request.archivoadjuntos != null)
				{
					if (request.archivoadjuntos.Count != 0)
					{
						var lista = new List<ServiceReferenceSitradoc.ArchivoExternoRequest>();
						foreach (var item in request.archivoadjuntos)
						{
							string[] ext = item.archivo.nombreOriginal.Split('.');
							var resultado_extension = "." + ext[ext.Length - 1].ToLower();
							lista.Add(new ServiceReferenceSitradoc.ArchivoExternoRequest()
							{
								nombre_archivo = item.archivo.nombreOriginal,
								mimetype = item.archivo.contentType,
								codigo = item.archivo.id,
								size = item.archivo.pesoEnBytes,
								tipo_archivo = resultado_extension,
								esBorrador = false,
							});
						}
						enviar_documento.archivos = lista.ToArray();
					}
				}
				var p = ServiceReferenceSitradoc.ExpedienteSitradocServiceClient
												.EndpointConfiguration
												.BasicHttpBinding_IExpedienteSitradocService;
				var route = _configuration.GetSection("AppConfig:Urls").GetValue<string>("URL_EXPEDIENTE_SITRADOC_API");
				var sitradoc = new ServiceReferenceSitradoc.ExpedienteSitradocServiceClient(p, route);
				//sr.Data = sitradoc.GenerarDocumentoExterno(enviar_documento);
				sr.Data = await sitradoc.GenerarDocumentoExternoAsync(enviar_documento);
			}
			catch (Exception ex)
			{
				sr.Success = false;
			}

			return sr;
		}

		[HttpPost]
		[Route("ActualizarSolicitudProContrata")]
		public async Task<StatusResponse<SolicitudResponse>> ActualizarSolicitudProContrata([FromBody] ProContrataExpedienteRequest request)
		{
			var sr = new StatusResponse<SolicitudResponse>();
			try
			{
				using (TransactionScope scope = new TransactionScope())
				{
					var solicitudRequest = new SolicitudRequest() { IdSolicitud = request.id_solicitud };
					var datosSolicitud = unitOfWork.p_Solicitud_ObtenerPorId(solicitudRequest);
					var solicitud = datosSolicitud.Data;

					solicitudRequest.NumTramiteDocumentario = request.numero_documento;
					solicitudRequest.IdDocumento = null;
					solicitudRequest.IdEstadoSolicitud = (int)ESTADO_SOLICITUD.REGISTRADO;
					solicitudRequest.IdTupa = 0;
					solicitudRequest.user_modificacion = request.user_modificacion;
					solicitudRequest.FechaModificacion = DateTime.Now;
					solicitudRequest.IdAnexo = 0;
					solicitudRequest.IdTipoTramite = request.id_tipo_tramite;
					solicitudRequest.CodProcontrata = request.id_expediente;
					solicitudRequest.NumProcontrata = request.numero_documento;
					//_solicitud.Actualizar(solicitud);
					//_unitOfWork.Guardar();
					sr = unitOfWork.p_Solicitud_Modificar(solicitudRequest);
					scope.Complete();
				}

			}
			catch (Exception ex)
			{
				sr.Success = false;
			}

			return sr;
		}

		[HttpPost]
		[Route("generarMovimiento")]
		public StatusResponse generarMovimiento([FromBody] SolicitudNoTupaRequest request)
		{
			Log.Warning("Se inicio generarMovimiento");
			var sr = new Release.Helper.StatusResponse { Success = true };
			try
			{
				var datosSolicitud = unitOfWork.p_Solicitud_ObtenerPorId(new SolicitudRequest() { IdSolicitud = request.id_solicitud }).Data;

				request.asunto = "Cargo recepción electrónico";
				request.id_persona = datosSolicitud.IdPersona;
				request.id_documento = (int)datosSolicitud.IdDocumento;
				request.numero_expediente = datosSolicitud.NumTramDocumentario;

				#region Generar movimiento Expediente
				if (!request.esProContrata)
				{
					var data = GenerarMovimiento(request);
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add(ex.Message);
			}

			return sr;
		}
		#endregion
		private StatusResponse<Prod.ServiciosExternos.SITRADOC.DocumentoInternoReponse> GenerarMovimiento(SolicitudNoTupaRequest request)
		{
			Log.Warning("Se inicio GenerarMovimiento");
			var sr = new StatusResponse<Prod.ServiciosExternos.SITRADOC.DocumentoInternoReponse> { Success = true };
			try
			{
				//var coddep_origen = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<string>("coddep_origen");
				//var folio = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<string>("folio");
				//var id_clase_documento_cargo = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<string>("id_clase_documento_cargo");

				var coddepdestino = _variablesSitradoc.CodDepDestinoCargoRecepcion;

				var movimiento = new ServiciosExternos.SITRADOC.DocumentoInternoRequest()
				{
					asunto = request.asunto,
					cod_gestorarchivo = request.cod_gestorarchivo_cargo,					
					cod_usuario = "dtramite",
					coddep_destino = _variablesSitradoc.CodDepDestinoCargoRecepcion,
					coddep_origen = _variablesSitradoc.coddep_origen,
					es_correspondencia = false,
					es_documento_respuesta = true,
					finalizar_documento = false,
					folio = _variablesSitradoc.folio,
					id_clase_documento = _variablesSitradoc.id_clase_documento_cargo,
					id_documento_referencia = request.id_documento,
					id_persona = request.id_persona,
					id_tipo_comunicacion = null,
					observaciones = "Ninguno",
				};
				sr.Data = this.expedienteSitradocServicio.GenerarDocumentoInterno(movimiento).Data;
				request.id_documento_cargo = sr.Data.id_documento;

				var final = this.expedienteSitradocServicio.FinalizarDocumento(new ServiciosExternos.SITRADOC.FinalizarDocumentoRequest
				{
					id_documento = request.id_documento,
					coddep = _variablesSitradoc.CodDepDestinoCargoRecepcion,
					usuario = _variablesSitradoc.usuario,
					observacion = "Finalizado automatico desde la plataforma de trámites digitales.",
					estado_expediente = 3,
					sujeto_proceso_judicial = 2
				});

				Notificar(request);
			}
			catch (Exception ex)
			{
				Log.Error("GenerarMovimiento :" + ex.Message);
				sr.Success = false;
			}
			return sr;
		}

		public void Notificar(SolicitudNoTupaRequest request)
		{
			try
			{

				var datosSolicitud = unitOfWork.p_Solicitud_ObtenerPorId(new SolicitudRequest() { IdSolicitud = request.id_solicitud }).Data;

				PersonaGeneralRequest personaResponse = new PersonaGeneralRequest();
				personaResponse.id_persona = datosSolicitud.IdPersona;
				var persona = this.personasServicio.ObtenerPersona(personaResponse);

				var ip_aplicacion = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<string>("IdApp");
				var IsDebug =  _configuration.GetSection("AppConfig").GetValue<bool>("IsDebug");
				var CorreoDebug = _configuration.GetSection("AppConfig").GetValue<string>("CorreoDebug");
				var EmailCargoRecepcion = _configuration.GetSection("AppConfig").GetValue<string>("EmailCargoRecepcion");

				

				//var sne = new ServiceNotificacion.EnvioDeNotificacionesServiceClient();
				Prod.ServiciosExternos.SNE.NuevaNotificacionRequest notificacion = new Prod.ServiciosExternos.SNE.NuevaNotificacionRequest();
				notificacion.id_aplicacion = Convert.ToInt32(ip_aplicacion);
				notificacion.ruc = persona.Data.nro_documento;
				notificacion.id_referencia_sitradoc_entrada = datosSolicitud.IdDocumento.Value;
				notificacion.id_referencia_sitradoc_salida = request.id_documento_cargo;
				notificacion.texto_contenido = "Cargo de recepción";				
                notificacion.cc_funcionario = IsDebug ? CorreoDebug : EmailCargoRecepcion;

                var codigos = new List<string>() { request.cod_gestorarchivo_cargo };
				var result_archivo = this.archivoProxy.FilesByIds(new Entidades.Archivo.ArchivosByIdsRequest()
				{
					ids = codigos.ToArray()
				});
				if (result_archivo.Success)
				{
					notificacion.archivo_principal = result_archivo.Data.FirstOrDefault().content;
				}
				var tieneDomicilio = this.domicilioElectronicoServicio.EsUnDomicilioValido(persona.Data.nro_documento);
				try
				{
					if (tieneDomicilio)
					{
						this.sneServicio.Enviar(notificacion);
					}
					else
					{
						if (persona.Data.nro_documento.Length == 11 && persona.Data.nro_documento.Substring(0, 2) == "10")
						{
							var nro_docpernatural = persona.Data.nro_documento.Substring(2, 8);
							var tieneDomicilioPN = this.domicilioElectronicoServicio.EsUnDomicilioValido(nro_docpernatural);
							notificacion.ruc = nro_docpernatural;
							var resuñ_sne = this.sneServicio.Enviar(notificacion);
						}
					}
				}
				catch (Exception ex)
				{
					//item.notificado = 2;
					//_respuesta.Actualizar(item);
				}
			}
			catch (Exception ex)
			{
				//throw;
			}

		}
    }
}