export interface solicitudRequest {
    IdEstadoSolicitud?: number;
    IdPersona?: number;
    FechaInicio?: string;
    FechaFin?: string;
    Page?: number;
    PageSize?: number;
}

export interface solicitudEnvioRequest {
    asunto?: string;
    indicativo?: string;
    referencia?: string;
    id_clase_documento?: number
    uploader_filename?: string;
    cod_dependencia?: number;
    coddep_origen?: number;
    id_tupa?: number
    cod_gestorarchivo?: string;
    archivoadjuntos?:Array<any>;
}
