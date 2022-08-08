using Prod.VUSP.Entidades.Comentario;
using Prod.VUSP.Entidades.DocumentoAdjunto;
using Prod.VUSP.Entidades.Flujo;
using Prod.VUSP.Entidades.PortalEnlace;
using Prod.VUSP.Entidades.Solicitud;
using Prod.VUSP.Entidades.Tupa;
using Prod.VUSP.Entidades.Notificacion;
using Prod.VUSP.Entidades.TupaRequisito;
using Release.Helper;
using Release.Helper.Data.ICore;
using Release.Helper.Pagination;
using System;
using System.Collections.Generic;
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
	public interface IUnitOfWork : IBaseUnitOfWork
	{
		IEnumerable<int> GetListId();
		PagedResponse<TupaResponse> p_Tupa_ListarPorClaseSector(TupaRequest request);
		PagedResponse<TupaResponse> p_Tupa_Listar(TupaRequest request);
		PagedResponse<BusquedaGeneralResponse> p_BusquedaGeneral_Listar(BusquedaGeneralRequest request);
		StatusResponse<TupaResponse> p_Tupa_ObtenerPorId(TupaRequest request);
		PagedResponse<NotificacionResponse> p_Notificacion_ListarPorUsuario(NotificacionRequest request);
		PagedResponse<AdjuntoResponse> p_Notificacion_ListarDocumentoAdjunto(NotificacionRequest request);
		StatusResponse<DocumentoSITRADOC> p_Notificacion_ObtenerDocumentoSitradoc(NotificacionRequest request);
		StatusResponse<NotificacionResponse> p_Notificacion_ObtenerPorId(NotificacionRequest request);
		StatusResponse<NotificacionResponse> p_Notificacion_ActualizarEstado(NotificacionRequest request);
		StatusResponse<AplicacionResponse> p_Aplicacion_ObtenerPorId(AplicacionRequest request);
		StatusResponse<List<EntidadPrincipalResponse>> p_DependenciasPrincipales_Obtener();
		StatusResponse<List<DependenciaResponse>> p_Dependencias_Obtener(DependenciaRequest request);
		StatusResponse<List<ClaseDocumentoResponse>> p_ClaseDocumento_Listar(ClaseDocumentoRequest request);
		StatusResponse<DependenciaResponse> p_Dependencias_ObtenerPorId(DependenciaRequest request);
		StatusResponse<List<AplicacionResponse>> p_Aplicacion_ObtenerEsVusp(AplicacionRequest request);
		StatusResponse<List<TupaRequisitoResponse>> p_TupaRequisito_Listar(TupaRequisitoRequest request);
		StatusResponse<List<PortalEnlaceResponse>> p_PortalEnlace_ListarPorSeccion(PortalEnlaceRequest request);
		StatusResponse<ComentarioLikeResponse> p_Comentario_RegistrarModificarLikeDislike(ComentarioLikeRequest request);
		StatusResponse<ComentarioLikeResponse> p_Comentario_ListarLikeDislikePorTupa(ComentarioLikeRequest request);
		StatusResponse<SolicitudResponse> p_Solicitud_Registrar(SolicitudRequest request);
		StatusResponse<ProcesoResponse> p_Proceso_Registrar(ProcesoRequest request);
		StatusResponse<ProcesoAdjuntosResponse> p_ProcesoAdjuntos_Registrar(ProcesoAdjuntosRequest request);
		StatusResponse<SolicitudResponse> p_Solicitud_Modificar(SolicitudRequest request);
		PagedResponse<SolicitudResponse> p_Solicitud_Listar(SolicitudRequest request);
		StatusResponse<SolicitudResponse> p_Solicitud_ObtenerPorId(SolicitudRequest request);
		PagedResponse<DocumentoAdjuntoResponse> p_DocumentoAdjunto_Listar(DocumentoAdjuntoRequest request);
		PagedResponse<FlujoResponse> p_DetalleFlujoDocumentario_Listar(FlujoRequest request);
		StatusResponse<List<ValidarDependenciaResponse>> p_ValidarDependencia_Listar();
		StatusResponse<List<ClaseDocumentoDerivarResponse>> p_ClaseDocumentoDerivar_Listar();
		StatusResponse<List<AplicacionUsuarioResponse>> p_Obtener_Datos_Aplicacion_By_Usuario(string user_name);
		PagedResponse<ServicioTramiteResponse> p_servicio_tramite_list_by_dependencia(ServicioTramiteRequest request);
		StatusResponse<UserInformationRequest> p_Obtener_id_usuario_extranet(int id_persona, string user_name);
		StatusResponse p_Actualizar_orden_click(int IdPortalEnlace);
	}
}
