using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Prod.VUSP.Datos;
using Prod.VUSP.Entidades.Notificacion;
using Release.Helper;
using Release.Helper.Pagination;
using System;
using System.Collections.Generic;
using System.IO;
using System.Configuration;
using System.Linq;

namespace Prod.VUSP.Core.Controllers.Consultas
{
	[Route("[controller]")]
	public class NotificacionConsultaController : ControllerBase
	{
		private readonly IUnitOfWork unitOfWork;
		private readonly IConfiguration _configuration;

		public NotificacionConsultaController(IUnitOfWork unitOfWork, IConfiguration configuration)
		{
			this.unitOfWork = unitOfWork;
			_configuration = configuration;
		}

		[HttpPost]
		[Route("Notificacion_ObtenerPorId")]
		public StatusResponse<NotificacionResponse> Notificacion_ObtenerPorId([FromBody] NotificacionRequest request)
		{
			var sr = unitOfWork.p_Notificacion_ObtenerPorId(request);
			return sr;
		}

		[HttpPost]
		[Route("Notificacion_ListarPorUsuario")]
		public PagedResponse<NotificacionResponse> Notificacion_ListarPorUsuario([FromBody] NotificacionRequest request)
		{
			var sr = unitOfWork.p_Notificacion_ListarPorUsuario(request);
			return sr;
		}

		[HttpPost]
		[Route("Notificacion_ListarDocumentoAdjunto")]
		public PagedResponse<AdjuntoResponse> Notificacion_ListarDocumentoAdjunto([FromBody] NotificacionRequest request)
		{

			var sr = unitOfWork.p_Notificacion_ListarDocumentoAdjunto(request);
			var notificacion = unitOfWork.p_Notificacion_ObtenerPorId(request);
			DocumentoSITRADOC adj = null;
			var adjuntos = new List<AdjuntoResponse>();
			request.id_referencia_sitradoc_salida = notificacion.Data.id_referencia_sitradoc_salida;
			adj = unitOfWork.p_Notificacion_ObtenerDocumentoSitradoc(request).Data;
			var localFilesPath = _configuration.GetSection("AppConfig:Paths").GetValue<string>("path_DOC_NOTELE");
			var archivos_sne = _configuration.GetSection("AppConfig:Paths").GetValue<string>("path_archivos_sne");
			var localFilesAdjuntoPath = _configuration.GetSection("AppConfig:Paths").GetValue<string>("path_DOC_NOTELE_ADJUNTOS");
			var localFilesAdjuntoSitradocPath = _configuration.GetSection("AppConfig:Paths").GetValue<string>("path_DOC_NOTELE_ADJUNTOS_SITRADOC");

			if (notificacion.Data.id_referencia_sitradoc_entrada != 0)
			{
				adjuntos = new List<AdjuntoResponse>{new AdjuntoResponse
				{
					FILA = 1,
					id_adjunto = notificacion.Data.id_referencia_sitradoc_salida,
					id_notificacion = notificacion.Data.id_notificacion,
					path_notificacion = adj.REFERENCIA,
					path_sitradoc =  Path.Combine(localFilesPath, String.Format("{0}.pdf", notificacion.Data.id_referencia_sitradoc_salida)),
					str_nombre_archivo = adj.REFERENCIA.Substring(0,15)
				}};
				if (sr.Data != null && sr.Data.Count != 0)
				{
					foreach (var item in sr.Data)
					{
						var result_adj = new AdjuntoResponse()
						{
							FILA = 2,
							id_adjunto = item.id_adjunto,
							id_notificacion = item.id_notificacion,
							path_notificacion = item.documento_anexo,
							str_nombre_archivo = null
						};

						string ruta = string.Empty;
						string[] ext = item.documento_anexo.Split('.');
						var extension = ext[ext.Length - 1];

						ruta = Path.Combine(localFilesAdjuntoSitradocPath, item.id_notificacion.ToString(), item.id_adjunto.ToString(), String.Format("{0}." + extension, item.id_adjunto));

						if (System.IO.File.Exists(ruta))
						{
							result_adj.path_sitradoc = ruta;
						}
						else
						{
							ruta = Path.Combine(localFilesAdjuntoSitradocPath, String.Format("{0}." + extension, item.id_referencia_sitradoc));

							if (System.IO.File.Exists(ruta))
							{
								result_adj.path_sitradoc = ruta;
							}
						}
						adjuntos.Add(result_adj);
					}
				}
				else
				{
					adjuntos = new List<AdjuntoResponse>{new AdjuntoResponse
					{
						FILA = 1,
						id_adjunto = notificacion.Data.id_notificacion,
						id_notificacion = notificacion.Data.id_notificacion,
						path_notificacion = notificacion.Data.referencia_salida,
						path_sitradoc = Path.Combine(localFilesPath, notificacion.Data.id_notificacion.ToString(),String.Format("{0}.pdf", notificacion.Data.id_notificacion)),
						str_nombre_archivo = notificacion.Data.referencia_salida.Substring(0,15)
					} };
					if (sr.Data!= null && sr.Data.Count != 0)
					{
						foreach (var item in sr.Data)
						{
							var result_adj = new AdjuntoResponse
							{
								FILA = 2,
								id_adjunto = item.id_adjunto,
								id_notificacion = notificacion.Data.id_notificacion,
								path_notificacion = item.documento_anexo,
								str_nombre_archivo = null
							};
							string ruta = string.Empty;
							string[] ext = item.documento_anexo.Split('.');
							var extension = ext[ext.Length - 1];

							ruta = Path.Combine(localFilesAdjuntoSitradocPath, item.id_notificacion.ToString(), item.id_adjunto.ToString(), String.Format("{0}." + extension, item.id_adjunto));
							if (System.IO.File.Exists(ruta))
							{
								result_adj.path_sitradoc = ruta;
							}
							else
							{

								ruta = Path.Combine(localFilesAdjuntoSitradocPath, String.Format("{0}.pdf", item.id_referencia_sitradoc));
								if (System.IO.File.Exists(ruta))
								{
									result_adj.path_sitradoc = ruta;
								}
								else
								{
									ruta = Path.Combine(archivos_sne, notificacion.Data.id_notificacion.ToString(), item.id_adjunto.ToString(), String.Format("{0}.pdf", item.id_referencia_sitradoc));
									if (System.IO.File.Exists(ruta))
									{
										result_adj.path_sitradoc = ruta;
									}

								}
							}
							adjuntos.Add(result_adj);


						}
					}
				}
			}

			sr.Data = adjuntos;
			return sr;
		}

		[HttpPost]
		[Route("NotificacionListarDocAdj")]
		public PagedResponse<AdjuntoResponse> NotificacionListarDocAdj([FromBody] NotificacionRequest request)
		{

			var sr = unitOfWork.p_Notificacion_ListarDocumentoAdjunto(request);
			var notificacion = unitOfWork.p_Notificacion_ObtenerPorId(request);
			DocumentoSITRADOC adj = null;
			var adjuntos = new List<AdjuntoResponse>();
			request.id_referencia_sitradoc_salida = notificacion.Data.id_referencia_sitradoc_salida;
			adj = unitOfWork.p_Notificacion_ObtenerDocumentoSitradoc(request).Data;
			var localFilesPath = _configuration.GetSection("AppConfig:Paths").GetValue<string>("path_DOC_NOTELE");
			
			if (notificacion.Data.id_referencia_sitradoc_entrada != 0)
			{
				adjuntos = new List<AdjuntoResponse>{new AdjuntoResponse
				{
					FILA = 1,
					id_adjunto = notificacion.Data.id_referencia_sitradoc_salida,
					id_notificacion = notificacion.Data.id_notificacion,
					path_notificacion = adj.REFERENCIA,
					path_sitradoc =  Path.Combine(localFilesPath, String.Format("{0}.pdf", notificacion.Data.id_referencia_sitradoc_salida))
				}};
			}

			sr.Data = adjuntos;
			return sr;
		}

	}
}
