export interface personaRequest {
    Id?: number;
    IdSector?: number;
    IdTipoPersona?: number;
    CodigoDepartamento?: string;
    CodigoProvincia?: string;
    CodigoDistrito?: string;
    IdTipoIdentificacion?: number;
    RazonSocial?: string;
    Nombres?: string;
    Apellidos?: string;
    NroDocumento?: string;
    Direccion?: string;
    Telefono?: string;
    Email?: string;
    RepresentanteLegal?: string;
    NroDocumentoRepresentante?: string;
    IdTipoIdentificacionRepLeg?: number;
    Flag?: string;
    Usuario?: string;
    Observaciones?: string;
    Celular?: string;
    NroDocPerNatural?: string;
    Contrasena?: string;
}