export class enumerados {
    COD_DEP: any =
    {
        OGACI: 7,
    };
    TIPO_DE_DOCUMENTO_PERSONA: any =
        {
            DNI: 1,
            LE: 2,
            CE: 3,
            BREVETE: 4,
            FOTOCHECK: 5,
            OTROS: 6,
            LIBRETA_MILITAR: 7,
            RUC: 8,
            PASAPORTE: 9
        };
    TIPO_PERSONA: any =
        {
            NATURAL: 1,
            JURIDICA: 2
        };
    TIPO_SECTOR_PERSONA: any =
        {
            PESQUERIA: 1,
            INDUSTRIA: 2,
            PRODUCE: 3,
        };
    ESTADO_PERSONA: any = {
        ACTIVO: 'A',
        INACTIVO: 'I'
    };
    TIPO_ACCION: any = {
        AGREGAR: 'A',
        EDITAR: 'E'
    };
    CLASE_TUPA: any = {
        PROCESOS: 1,
        SERVICIOS: 2,
        OTROS_PROCEDIMIENTOS: 3
    };
    CLASE_DOCUMENTO: any = {
        INTERNO: 'I',
        EXTERNO: 'E',
    };
    TIPO_SECTOR: any = {
        OTROS: 3,
        PESCA: 1,
        INDUSTRIA: 2
    };
    TIPO_ENUMERADO: any = {
        TIPO_SECCION: 10
    };
    ENUMERADO: any = {
        TRAMITE_EN_LINEA: 10001,
        CONSULTA_EN_LINEA_ATENCION_AL_CIUDADANO: 10002,
        CONSULTA_EN_LINEA_SERVICIOS: 10003,
        SERVICIOS_EMPRESARIALES: 10004,
        APLICACIONES_MOVILES_PESCA: 10005 ,
        APLICACIONES_MOVILES_INDUSTRIA: 10006,
        APLICACIONES_MOVILES_OTROS: 10007
    };
}
