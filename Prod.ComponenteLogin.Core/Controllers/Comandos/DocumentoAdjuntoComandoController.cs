using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.DocumentoAdjunto;
using Prod.VUSP.Entidades.Proceso;
using Prod.VUSP.Entidades.ProcesoAdjuntos;
using Prod.VUSP.Entidades.Solicitud;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.VUSP.Core.Controllers.Comandos
{
    [Route("[controller]")]
    public class DocumentoAdjuntoComandoController : ControllerBase
    {
		private readonly IUnitOfWork unitOfWork;
		private readonly IConfiguration _configuration;
		private readonly ServiciosExternos.IExpedienteSitradocServicio expedienteSitradocServicio;
		
		public DocumentoAdjuntoComandoController(IUnitOfWork unitOfWork, IConfiguration configuration, ServiciosExternos.IExpedienteSitradocServicio expedienteSitradocServicio)
		{
			this.unitOfWork = unitOfWork;
			_configuration = configuration;
			this.expedienteSitradocServicio = expedienteSitradocServicio;
		}

		[HttpPost]
		[Route("RegistrarDocumentoAdjunto")]
		public StatusResponse RegistrarDocumentoAdjunto([FromBody] DocumentoAdjuntoRequest request)
		{
			StatusResponse response = new StatusResponse();
			var entidad = new ProcesoRequest();
			entidad.IdSolicitud = request.id_solicitud;
			entidad.Asunto = string.IsNullOrEmpty(request.asunto) ? "-" : request.asunto;
			entidad.IdClaseDocumento = 44; //CLASE_DOCUMENTO.ADJUNTO
			entidad.CodUsuario = "VSP";
			entidad.IdTipoDocumento = 4;
			entidad.IdEstadoDocumento = 1;// ESTADO_DOCUMENTO.ACTIVO;
			entidad.CodGestorArchivo = "-";
			entidad.CodDepOrigen = request.coddep_origen;
			entidad.AceptadoAutomatico = true;
			entidad.Referencia = "ADJUNTO";

			var proceso = unitOfWork.p_Proceso_Registrar(entidad);

			if (request.archivos != null)
			{
				if (request.archivos.Count != 0)
				{
					var tipoArchivo = _configuration.GetSection("AppConfig:VariablesSitradoc").GetValue<string>("id_tipo_documento");
					foreach (var item in request.archivos)
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


			var adjuntoExterno = new Prod.ServiciosExternos.SITRADOC.AdjuntoExternoRequest()
			{
				id_documento = request.id_documento,
				id_persona = request.id_persona,
				id_tipo_anexo = request.id_tipo_anexo,
				folios = request.folios,
				contenido = request.asunto,
				observaciones = request.observaciones,
				cod_usuario = request.cod_usuario,
				cod_gestorarchivo = null
			};

			var lista = new List<Prod.ServiciosExternos.SITRADOC.ArchivoExternoRequest>();
			request.archivos?.ToList().ForEach(file => {
				string[] ext = file.archivo.nombreOriginal.Split('.');
				var resultado_extension = "." + ext[ext.Length - 1].ToLower();
				lista.Add(new Prod.ServiciosExternos.SITRADOC.ArchivoExternoRequest()
				{
					nombre_archivo = file.archivo.nombreOriginal,
					mimetype = file.archivo.contentType,
					codigo = file.archivo.id,
					size = file.archivo.pesoEnBytes,
					tipo_archivo = resultado_extension,
					esBorrador = false,
				});
			});
			adjuntoExterno.archivos = lista.ToArray();

			var documento = this.expedienteSitradocServicio.GenerarAdjuntoExterno(adjuntoExterno);
			if (documento.Success)
			{
				if (documento.Data.id_anexo > 0 && documento.Data.numero_anexo != null)
				{
					SolicitudRequest solicitudRequest = new SolicitudRequest();
					solicitudRequest.IdSolicitud = request.id_solicitud;
					solicitudRequest.IdEstadoSolicitud = 2;
					solicitudRequest.coddep = request.cod_dependencia;
					solicitudRequest.FechaModificacion = DateTime.Now;
					solicitudRequest.NumTramiteDocumentario = documento.Data.numero_anexo;
					solicitudRequest.IdDocumento = documento.Data.id_documento;
					solicitudRequest.IdAnexo = documento.Data.id_anexo;
					solicitudRequest.IdTipoTramite = request.id_tipo_tramite;
					solicitudRequest.user_modificacion = "VUSP";
					//solicitudRequest.CodProcontrata = "";
					//solicitudRequest.NumProcontrata = "";
					var res = unitOfWork.p_Solicitud_Modificar(solicitudRequest);

					response.Success = true;

				}
				else
				{
					response.Success = false;
					response.Messages.Add("El documento no ha sido generado correctamente, por favor intentarlo nuevamente.");
				}
			}
			else
			{
				response.Success = false;
				response.Messages = documento.Messages;
			}


			return response;
		}
	}
}
