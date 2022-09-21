export class solicitudModel {
  idEstadoSolicitud?: number = 0;
  fechaInicio?: string = null;
  fechaFin?: string = null;
}
export class solicitudRegistroModel {
  asunto?: string = null;
  indicativo?: string = null;
  referencia?: string = null;
  clase?: string = null;
  uploader_filename?: string = null;
  cod_dependencia?: number;
  coddep_origen?: number;
  cod_gestorarchivo?: string;
  archivoadjuntos : Array<adjuntoModel>;
}
export class adjuntoModel {
  id_requisito?: number;
  nombre?: string = null;
  ArchivoAdjuntoRequest: archivoAdjuntoModel
  es_descarga?: boolean = false;
  codigo_pago?: string = null;
  requisito?: string = null;
  codigo_archivo?: string = null;
  nombre_requisito?: string = null;
}

export class archivoAdjuntoModel {
  contentType?: string = null;
  descripcion?: string = null;
  etiqueta?: string = null;
  fechaCreacion: Date;
  fechaModificacion?: Date = null;
  id: string;
  idArchivoVersion: string;
  metadata: string;
  nombreOficial: string;
  nombreOriginal: string;
  pesoEnBytes: number;
  reemplazarDatos?: boolean = false;
  version: number;
  content: any;
}

export class ConcentimientoSNEModel {
  es_persona_juridica: boolean;
	aviso_informativo: string;
	aviso_pregunta: string;
	esta_activo_sne: boolean;
	tiene_consentimiento: boolean = true;
}

export class usuarioDomicilioModel {
  razonSocial: string;
	nombreCompleto: string;
	dni: string;
	ruc: string;
	correoElectronico: string;
  celular: string;
  esta_activo_sne: boolean;
  es_persona_juridica: boolean;
  tiene_consentimiento: boolean;
  codigo_departamento: string;
  codigo_provincia: string;
  codigo_distrito: string;
  direccion: string;
}