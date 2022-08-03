export interface ServicioTramiteRequest {
    id_servicio_tramite?: number;
    codigo_dependencia?: number;
    descripcion_servicio?: string;
    es_eliminado?: boolean;
    id_tupa?: number;
    Page?: number;
    PageSize?: number;
}