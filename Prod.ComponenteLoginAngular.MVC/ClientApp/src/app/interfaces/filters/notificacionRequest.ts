export interface notificacionRequest {
    id_notificacion?: number;
    id_persona?: number;
    id_estado?: number;
    referencia?: string;
    asunto?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    Page?: number;
    PageSize?: number;
}
