namespace Prod.LoginUnico.Application.Models.Services;

public class PersonasServiceRequest
{
    public int id;

    public int id_sector;

    public int id_tipo_persona;


    public string codigo_departamento;

    public string codigo_provincia;

    public string codigo_distrito;


    public int id_tipo_identificacion;

    //public string rubro;

    public string razon_social;

    public string nombres;

    public string apellidos;

    public string nro_documento;


    public string direccion;

    //public string telefono;

    //public string fax;

    public string email;


    public DateTime audit_mod;

    //public string representante_legal;

    //public string nro_documento_representante;

    //public int? id_tipo_identificacion_rep_leg;

    //public int? codigo_puerto;


    public string flag;

    public string usuario;

    //public string observaciones;


    public string celular;


    //public int? id_aura;

    //public string flag_oec;

    //public int? id_tipo_organizacion;

    public string nro_docpernatural;

    // Auditoria
    public string usuario_mod;

    public DateTime? fecha_mod;


    //public string cod_genero;

    //public bool? no_tiene_ruc;
}