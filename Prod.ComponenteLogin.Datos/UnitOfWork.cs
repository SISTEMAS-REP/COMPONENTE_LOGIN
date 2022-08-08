using Prod.VUSP.Entidades.Comentario;
using Prod.VUSP.Entidades.DocumentoAdjunto;
using Prod.VUSP.Entidades.Flujo;
using Prod.VUSP.Entidades.PortalEnlace;
using Prod.VUSP.Entidades.Solicitud;
using Prod.VUSP.Entidades.Tupa;
using Prod.VUSP.Entidades.Notificacion;
using Prod.VUSP.Entidades.TupaRequisito;
using Release.Helper;
using Release.Helper.Data.Core;
using Release.Helper.Pagination;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Prod.VUSP.Entidades.AplicacionExtranet;
using Prod.VUSP.Entidades.BusquedadGeneral;
using Prod.VUSP.Entidades.EntidadPrincipal;
using Prod.VUSP.Entidades.Dependencia;
using Prod.VUSP.Entidades.ClaseDocumento;
using Prod.VUSP.Entidades.Proceso;
using Prod.VUSP.Entidades.ProcesoAdjuntos;
using Prod.VUSP.Entidades.ValidarDependencia;
using Prod.VUSP.Entidades.ClaseDocumentoDerivar;
using Prod.VUSP.Entidades.AplicacionUsuario;
using Prod.VUSP.Entidades.ServicioTramite;
using Prod.VUSP.Entidades.UserInformation;

namespace Prod.VUSP.Datos
{
	public class UnitOfWork : BaseUnitOfWork, IUnitOfWork
	{
		public UnitOfWork(IDbContext ctx) : base(ctx, true)
		{
		}

		public IEnumerable<int> GetListId()
		{
			var ids = new List<int>();
			for (int i = 0; i < 10; i++)
			{
				ids.Add(i);
			}
			return ids;
		}

		//public PagedResponse<DescargasResponse> Descargas(DescargasFilter filtro)
		//{
		//	PagedResponse<DescargasResponse> rpta = new PagedResponse<DescargasResponse>();
		//	var result = _uow.DescargasPaginado(filtro);
		//	if (result != null && result.Any())
		//	{
		//		rpta.Data = result.ToList();
		//		rpta.TotalRows = result.FirstOrDefault().TotalRows;
		//		rpta.TotalPages = Convert.ToInt64(rpta.TotalRows / filtro.PageSize);
		//	}
		//	return rpta;
		//}

		public PagedResponse<TupaResponse> p_Tupa_ListarPorClaseSector(TupaRequest request)
		{
			PagedResponse<TupaResponse> sr = new PagedResponse<TupaResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdSector",request.IdSector),
					new Parameter("@IdClaseTupa",request.IdClaseTupa),
					new Parameter("@Query",request.Query),
					new Parameter("@Page",request.Page),
					new Parameter("@Rows",request.PageSize),
				};
				var data = this.ExecuteReader<TupaResponse>("mantenimiento.p_Tupa_ListarPorClaseSector", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
					sr.TotalRows = data.FirstOrDefault().TotalRows;
					sr.TotalPages = Convert.ToInt64(sr.TotalRows / request.PageSize);
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}

		public PagedResponse<TupaResponse> p_Tupa_Listar(TupaRequest request)
		{
			PagedResponse<TupaResponse> sr = new PagedResponse<TupaResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@QUERY",request.Query),
					new Parameter("@PAGEINDEX",request.Page),
					new Parameter("@PAGESIZE",request.PageSize),
				};
				var data = this.ExecuteReader<TupaResponse>("mantenimiento.p_Tupa_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
					sr.TotalRows = data.FirstOrDefault().TotalRows;
					sr.TotalPages = Convert.ToInt64(sr.TotalRows / request.PageSize);
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}

		public PagedResponse<BusquedaGeneralResponse> p_BusquedaGeneral_Listar(BusquedaGeneralRequest request)
		{
			PagedResponse<BusquedaGeneralResponse> sr = new PagedResponse<BusquedaGeneralResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@QUERY",request.Query),
					new Parameter("@PAGEINDEX",request.Page),
					new Parameter("@PAGESIZE",request.PageSize),
				};
				var data = this.ExecuteReader<BusquedaGeneralResponse>("mantenimiento.p_Busqueda_general_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
					sr.TotalRows = data.FirstOrDefault().TotalRows;
					sr.TotalPages = Convert.ToInt64(sr.TotalRows / request.PageSize);
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}
		public StatusResponse<TupaResponse> p_Tupa_ObtenerPorId(TupaRequest request)
		{
			StatusResponse<TupaResponse> sr = new StatusResponse<TupaResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdTupa",request.IdTupa)
				};
				var data = this.ExecuteReader<TupaResponse>("mantenimiento.p_Tupa_ObtenerPorId", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

		public PagedResponse<NotificacionResponse> p_Notificacion_ListarPorUsuario(NotificacionRequest request)
		{
			PagedResponse<NotificacionResponse> sr = new PagedResponse<NotificacionResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@PAGESIZE",request.PageSize),
					new Parameter("@PAGEINDEX",request.Page),
					new Parameter("@ID_PERSONA",request.id_persona),
					new Parameter("@ID_ESTADO",request.id_estado),
					new Parameter("@REFERENCIA",request.referencia),
					new Parameter("@ASUNTO",request.asunto),
					new Parameter("@FECHA_INICIO",request.fecha_inicio),
					new Parameter("@FECHA_FIN",request.fecha_fin)
				};
				var data = this.ExecuteReader<NotificacionResponse>("mantenimiento.p_Notificacion_ListarPorUsuario", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
					sr.TotalRows = data.FirstOrDefault().ROWS_COUNT;
					sr.TotalPages = data.FirstOrDefault().PAGE_COUNT;
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}
		public PagedResponse<AdjuntoResponse> p_Notificacion_ListarDocumentoAdjunto(NotificacionRequest request)
		{
			PagedResponse<AdjuntoResponse> sr = new PagedResponse<AdjuntoResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@PAGESIZE",request.PageSize),
					new Parameter("@PAGEINDEX",request.Page),
					new Parameter("@ID_NOTIFICACION",request.id_notificacion)
				};
				var data = this.ExecuteReader<AdjuntoResponse>("mantenimiento.p_Notificacion_ListarDocumentoAdjunto", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
					sr.TotalRows = data.FirstOrDefault().ROWS_COUNT;
					sr.TotalPages = data.FirstOrDefault().PAGE_COUNT;
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}

		public StatusResponse<DocumentoSITRADOC> p_Notificacion_ObtenerDocumentoSitradoc(NotificacionRequest request)
		{
			StatusResponse<DocumentoSITRADOC> sr = new StatusResponse<DocumentoSITRADOC>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@id_referencia_documento",request.id_referencia_sitradoc_salida)
				};
				var data = this.ExecuteReader<DocumentoSITRADOC>("mantenimiento.p_Notificacion_ObtenerDocumentoSitradoc", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<NotificacionResponse> p_Notificacion_ObtenerPorId(NotificacionRequest request)
		{
			StatusResponse<NotificacionResponse> sr = new StatusResponse<NotificacionResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_NOTIFICACION",request.id_notificacion)
				};
				var data = this.ExecuteReader<NotificacionResponse>("mantenimiento.p_Notificacion_ObtenerPorId", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

		public StatusResponse<NotificacionResponse> p_Notificacion_ActualizarEstado(NotificacionRequest request)
		{
			StatusResponse<NotificacionResponse> sr = new StatusResponse<NotificacionResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_NOTIFICACION",request.id_notificacion)
				};
				var data = this.ExecuteReader<NotificacionResponse>("mantenimiento.p_Notificacion_ActualizarEstado", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

		public StatusResponse<AplicacionResponse> p_Aplicacion_ObtenerPorId(AplicacionRequest request)
		{
			StatusResponse<AplicacionResponse> sr = new StatusResponse<AplicacionResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_APLICACION",request.IdAplicacion)
				};
				var data = this.ExecuteReader<AplicacionResponse>("mantenimiento.p_AplicacionExtranet_ObtenerPorId", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<List<AplicacionResponse>> p_Aplicacion_ObtenerEsVusp(AplicacionRequest request)
		{
			StatusResponse<List<AplicacionResponse>> sr = new StatusResponse<List<AplicacionResponse>>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdCategoria",request.IdCategoria),
				};
				var data = this.ExecuteReader<AplicacionResponse>("mantenimiento.p_AplicacionExtranet_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<List<EntidadPrincipalResponse>> p_DependenciasPrincipales_Obtener()
		{
			StatusResponse<List<EntidadPrincipalResponse>> sr = new StatusResponse<List<EntidadPrincipalResponse>>();
			try
			{
				var param = new Parameter[]{
				};
				var data = this.ExecuteReader<EntidadPrincipalResponse>("transaccional.p_DEPENDENCIA_PRINCIPAL_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<List<DependenciaResponse>> p_Dependencias_Obtener(DependenciaRequest request)
		{
			StatusResponse<List<DependenciaResponse>> sr = new StatusResponse<List<DependenciaResponse>>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@CODDEP_PRINCIPAL",request.coddep_principal),
					new Parameter("@BUSCAR",request.buscar),
				};
				var data = this.ExecuteReader<DependenciaResponse>("transaccional.p_DEPENDENCIA_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<List<ClaseDocumentoResponse>> p_ClaseDocumento_Listar(ClaseDocumentoRequest request)
		{
			StatusResponse<List<ClaseDocumentoResponse>> sr = new StatusResponse<List<ClaseDocumentoResponse>>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@PROCEDENCIA",request.procedencia),
				};
				var data = this.ExecuteReader<ClaseDocumentoResponse>("transaccional.p_CLASEDOCUMENTO_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<DependenciaResponse> p_Dependencias_ObtenerPorId(DependenciaRequest request)
		{
			StatusResponse<DependenciaResponse> sr = new StatusResponse<DependenciaResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@CODDEP",request.coddep),
				};
				var data = this.ExecuteReader<DependenciaResponse>("transaccional.p_DEPENDENCIA_ObtenerPorId", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<List<TupaRequisitoResponse>> p_TupaRequisito_Listar(TupaRequisitoRequest request)
		{
			StatusResponse<List<TupaRequisitoResponse>> sr = new StatusResponse<List<TupaRequisitoResponse>>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdTupa",request.IdTupa),
				};
				var data = this.ExecuteReader<TupaRequisitoResponse>("mantenimiento.p_TupaRequisito_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

		public StatusResponse<List<PortalEnlaceResponse>> p_PortalEnlace_ListarPorSeccion(PortalEnlaceRequest request)
		{
			StatusResponse<List<PortalEnlaceResponse>> sr = new StatusResponse<List<PortalEnlaceResponse>>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdTipoSeccion",request.TipoSeccion),
					new Parameter("@EsPrincipal",request.EsPrincipal),
				};
				var data = this.ExecuteReader<PortalEnlaceResponse>("mantenimiento.p_PortalEnlace_ListarPorSeccion", CommandType.StoredProcedure, ref param).ToList();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

		public StatusResponse<ComentarioLikeResponse> p_Comentario_RegistrarModificarLikeDislike(ComentarioLikeRequest request)
		{
			StatusResponse<ComentarioLikeResponse> sr = new StatusResponse<ComentarioLikeResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdPersona",request.IdPersona),
					new Parameter("@IdTupa",request.IdTupa),
					new Parameter("@MeGusta",request.MeGusta),
					new Parameter("@UsuarioRegistro",request.UsuarioRegistro),
					new Parameter("@UsuarioModificacion",request.UsuarioModificacion)
				};
				var data = this.ExecuteReader<ComentarioLikeResponse>("transaccional.p_Comentario_RegistrarModificarLikeDislike", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

		public StatusResponse<ComentarioLikeResponse> p_Comentario_ListarLikeDislikePorTupa(ComentarioLikeRequest request)
		{
			StatusResponse<ComentarioLikeResponse> sr = new StatusResponse<ComentarioLikeResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdTupa",request.IdTupa)
				};
				var data = this.ExecuteReader<ComentarioLikeResponse>("transaccional.p_Comentario_ListarLikeDislikePorTupa", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

		public PagedResponse<SolicitudResponse> p_Solicitud_Listar(SolicitudRequest request)
		{
			PagedResponse<SolicitudResponse> sr = new PagedResponse<SolicitudResponse>();
			try
			{
				var param = new Parameter[]{
					//new Parameter("@IdTipoDocumento",request.IdTipoDocumento),
					new Parameter("@IdEstadoSolicitud",request.IdEstadoSolicitud),
					new Parameter("@FechaInicio",request.FechaInicio),
					new Parameter("@FechaFin",request.FechaFin),
					new Parameter("@Idpersona",request.IdPersona),
					new Parameter("@Page",request.Page),
					new Parameter("@Rows",request.PageSize),
				};
				var data = this.ExecuteReader<SolicitudResponse>("transaccional.p_Solicitud_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
					sr.TotalRows = data.FirstOrDefault().TotalRows;
					sr.TotalPages = Convert.ToInt64(sr.TotalRows / request.PageSize);
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}

		public PagedResponse<DocumentoAdjuntoResponse> p_DocumentoAdjunto_Listar(DocumentoAdjuntoRequest request)
		{
			PagedResponse<DocumentoAdjuntoResponse> sr = new PagedResponse<DocumentoAdjuntoResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdSolicitud",request.IdSolicitud),
					new Parameter("@Page",request.Page),
					new Parameter("@Rows",request.PageSize),
				};
				var data = this.ExecuteReader<DocumentoAdjuntoResponse>("transaccional.p_DocumentoAdjunto_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
					sr.TotalRows = data.FirstOrDefault().TotalRows;
					sr.TotalPages = Convert.ToInt64(sr.TotalRows / request.PageSize);
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}

		public PagedResponse<FlujoResponse> p_DetalleFlujoDocumentario_Listar(FlujoRequest request)
		{
			PagedResponse<FlujoResponse> sr = new PagedResponse<FlujoResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdDocumento",request.IdDocumento),
					new Parameter("@Page",request.Page),
					new Parameter("@Rows",request.PageSize),
				};
				var data = this.ExecuteReader<FlujoResponse>("[transaccional].[p_DETALLE_FLUJO_DOCUMENTARIO_Listar]", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
					sr.TotalRows = data.FirstOrDefault().TotalRows;
					sr.TotalPages = Convert.ToInt64(sr.TotalRows / request.PageSize);
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}
        public StatusResponse<SolicitudResponse> p_Solicitud_Registrar(SolicitudRequest request)
        {
			StatusResponse<SolicitudResponse> sr = new StatusResponse<SolicitudResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_PERSONA",request.IdPersona),
					new Parameter("@ID_TUPA",request.IdTupa),
					new Parameter("@COD_DEP",request.coddep),
					new Parameter("@ESTADO_SOLICITUD",request.IdEstadoSolicitud),
					new Parameter("@USER",request.user_registro),
				};
				var data = this.ExecuteReader<SolicitudResponse>("transaccional.p_Solicitud_Agregar", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<ProcesoResponse> p_Proceso_Registrar(ProcesoRequest request)
		{
			StatusResponse<ProcesoResponse> sr = new StatusResponse<ProcesoResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_SOLICITUD",request.IdSolicitud),
					new Parameter("@ASUNTO",request.Asunto),
					new Parameter("@ID_CLASE_DOCUMENTO",request.IdClaseDocumento),
					new Parameter("@COD_USUARIO",request.CodUsuario),
					new Parameter("@ID_TIPO_DOCUMENTO",request.IdTipoDocumento),
					new Parameter("@ID_ESTADO_DOCUMENTO",request.IdEstadoDocumento),
					new Parameter("@COD_DEP_ORIGEN",request.CodDepOrigen),
					new Parameter("@COD_GESTOR_ARCHIVO",request.CodGestorArchivo),
					new Parameter("@REFERENCIA",request.Referencia),
				};
				var data = this.ExecuteReader<ProcesoResponse>("transaccional.p_Proceso_Agregar", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<ProcesoAdjuntosResponse> p_ProcesoAdjuntos_Registrar(ProcesoAdjuntosRequest request)
		{
			StatusResponse<ProcesoAdjuntosResponse> sr = new StatusResponse<ProcesoAdjuntosResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_SOLICITUD",request.IdSolicitud),
					new Parameter("@NOMBRE_ARCHIVO",request.NombreArchivo),
					new Parameter("@DESCRIPCION_ARCHIVO",request.DescripcionArchivo),
					new Parameter("@MIMETYPE",request.Mimetype),
					new Parameter("@COD_GESTOR_ARCHIVO",request.CodigoGA),
					new Parameter("@SIZE",request.Size),
					new Parameter("@TIPO_ARCHIVO",request.TipoArchivo),
					new Parameter("@ID_REQUISITO",request.IdRequisito),
				};
				var data = this.ExecuteReader<ProcesoAdjuntosResponse>("transaccional.p_ProcesoAdjuntos_Agregar", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<SolicitudResponse> p_Solicitud_ObtenerPorId(SolicitudRequest request)
		{
			StatusResponse<SolicitudResponse> sr = new StatusResponse<SolicitudResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdSolicitud",request.IdSolicitud),
				};
				var data = this.ExecuteReader<SolicitudResponse>("transaccional.p_Solicitud_ObtenerPorId", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Success = true;
					sr.Messages.Add("No se encontraron resultados.");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<SolicitudResponse> p_Solicitud_Modificar(SolicitudRequest request)
		{
			StatusResponse<SolicitudResponse> sr = new StatusResponse<SolicitudResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_SOLICITUD",request.IdSolicitud),
					new Parameter("@ID_DOCUMENTO",request.IdDocumento),
					new Parameter("@ESTADO_SOLICITUD",request.IdEstadoSolicitud),
					new Parameter("@USER",request.user_modificacion),
					new Parameter("@ID_ANEXO",request.IdAnexo),
					new Parameter("@NUM_TRAM_DOCUMENTARIO",request.NumTramiteDocumentario),
					new Parameter("@ID_TIPO_TRAMITE",request.IdTipoTramite),
					new Parameter("@COD_PROCONTRATA",request.CodProcontrata),
					new Parameter("@NUM_PROCONTRATA",request.NumProcontrata)
				};
				var data = this.ExecuteReader<SolicitudResponse>("transaccional.p_Solicitud_Modificar", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<List<ValidarDependenciaResponse>> p_ValidarDependencia_Listar()
		{
			StatusResponse<List<ValidarDependenciaResponse>> sr = new StatusResponse<List<ValidarDependenciaResponse>>();
			try
			{
				var param = new Parameter[]{
				};
				var data = this.ExecuteReader<ValidarDependenciaResponse>("transaccional.p_ValidarDependencia_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
		public StatusResponse<List<ClaseDocumentoDerivarResponse>> p_ClaseDocumentoDerivar_Listar()
		{
			StatusResponse<List<ClaseDocumentoDerivarResponse>> sr = new StatusResponse<List<ClaseDocumentoDerivarResponse>>();
			try
			{
				var param = new Parameter[]{
				};
				var data = this.ExecuteReader<ClaseDocumentoDerivarResponse>("transaccional.p_ClaseDocumentoDerivar_Listar", CommandType.StoredProcedure, ref param).ToList();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
        public StatusResponse<List<AplicacionUsuarioResponse>> p_Obtener_Datos_Aplicacion_By_Usuario(string user_name)
        {
            StatusResponse<List<AplicacionUsuarioResponse>> sr = new StatusResponse<List<AplicacionUsuarioResponse>>();
            try
            {
                var param = new Parameter[]{
                    new Parameter("@USERNAME",user_name),
                };
                var data = this.ExecuteReader<AplicacionUsuarioResponse>("transaccional.p_Obtener_Datos_Aplicacion_By_Usuario", CommandType.StoredProcedure, ref param).ToList();
                if (data != null)
                {
                    sr.Success = true;
                    sr.Data = data;
                    sr.Messages.Add("Se obtuvo correctamente");
                }
                else
                {
                    sr.Messages.Add("Ocurrio un error");
                }
            }
            catch (Exception ex)
            {
                sr.Success = false;
                sr.Messages.Add("Ocurrio un error" + ex.Message);
            }
            return sr;
        }

		public PagedResponse<ServicioTramiteResponse> p_servicio_tramite_list_by_dependencia(ServicioTramiteRequest request)
		{
			PagedResponse<ServicioTramiteResponse> sr = new PagedResponse<ServicioTramiteResponse>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@CODIDO_DEPENDENCIA",request.codigo_dependencia),
				};
				var data = this.ExecuteReader<ServicioTramiteResponse>("transaccional.p_servicio_tramite_list_by_dependencia", CommandType.StoredProcedure, ref param).ToList();
				if (data != null && data.Any())
				{
					sr.Data = data;
				}
			}
			catch (Exception ex)
			{

			}
			return sr;
		}

		public StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet(int id_persona, string user_name)
		{
			StatusResponse<UserInformationRequest> sr = new StatusResponse<UserInformationRequest>();
			try
			{
				var param = new Parameter[]{
					new Parameter("@ID_PERSONA",id_persona),
					new Parameter("@USER_NAME",user_name)
				};
				var data = this.ExecuteReader<UserInformationRequest>("transaccional.p_Obtener_id_usuario_extranet", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}

		public StatusResponse p_Actualizar_orden_click(int IdPortalEnlace)
		{
			StatusResponse sr = new StatusResponse();
			try
			{
				var param = new Parameter[]{
					new Parameter("@IdPortalEnlace",IdPortalEnlace)
				};
				var data = this.ExecuteReader<PortalEnlaceResponse>("mantenimiento.p_Actualizar_orden_click", CommandType.StoredProcedure, ref param).FirstOrDefault();
				if (data != null)
				{
					sr.Success = true;
					sr.Data = data;
					sr.Messages.Add("Se obtuvo correctamente");
				}
				else
				{
					sr.Messages.Add("Ocurrio un error");
				}
			}
			catch (Exception ex)
			{
				sr.Success = false;
				sr.Messages.Add("Ocurrio un error" + ex.Message);
			}
			return sr;
		}
	}
}
