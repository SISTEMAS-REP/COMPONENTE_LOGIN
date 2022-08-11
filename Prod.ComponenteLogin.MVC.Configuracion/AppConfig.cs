using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ComponenteLogin.MVC.Configuracion
{
    public class AppConfig
    {
        public Urls Urls { get; set; }
        public RegistroUsuario RegistroUsuario { get; set; }
        public RegistroTramite RegistroTramite { get; set; }
        public ReportConfig ReportConfig { get; set; }
        public Recaptcha Recaptcha { get; set; }
    }
    public class Urls
    {
        public string URL_MIGRACIONES_API { get; set; }
        public string URL_RENIEC_API { get; set; }
        public string URL_SUNAT_API { get; set; }
        public string URL_PRODUCE_VIRTUAL { get; set; }
        public string URL_PRODUCE_VIRTUAL_WEB { get; set; }
        public string URL_ROLES_API { get; set; }
        public string URL_PERSONA_API { get; set; }
        public string URL_SEGURIDAD { get; set; }
        public string URL_DOMICILIO_SNE_API { get; set; }
        public string URL_LOGIN_UNICO_API { get; set; }
    }

    public class RegistroUsuario
    {
        public string IdAplicacion { get; set; }
        public string IdRol { get; set; }
        public string TipoRol { get; set; }
        public string NombreRol { get; set; }
        public string Usuario { get; set; }
    }

    public class RegistroTramite
    {
        public string Extensiones { get; set; }
        public string PesoMaxAdjunto { get; set; }
        public string PesoMaxPrincipal { get; set; }
        public string maxSize { get; set; }
        public string DEP_OGACI { get; set; }
        public string RutaUploadDocumentoSitradoc { get; set; }
        public string IsDebug { get; set; }
        public string CorreoDebug { get; set; }
        public string IdClaseDocumentoProContrata { get; set; }
        public string RutaImagenLogo { get; set; }
        public string tipoIdentificacionSunat { get; set; }
    }

    public class Recaptcha
    {
        public string recaptchaPublickey { get; set; }
        public string recaptchaPrivatekey { get; set; }
        public string URL_CAPTCHA_API { get; set; }
        public string ruta_pide { get; set; }
    }

    public class ReportConfig
    {
        public string UrlReportServer { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Domain { get; set; }
        public string ReportFolder { get; set; }
        public string RutaUploadCargoRecepcion { get; set; }
        public string RutaUploadCargoRecepcionFirmado { get; set; }
        public string UrlFirmador { get; set; }
    }

}
