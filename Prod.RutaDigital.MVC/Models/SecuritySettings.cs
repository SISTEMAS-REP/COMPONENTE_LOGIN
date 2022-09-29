namespace Prod.RutaDigital.MVC.Models
{
    public class SecuritySettings
    {
        public string KeyDirectory { get; set; }
        public string ApplicationName { get; set; }

        public string CookieName { get; set; }
        public int SecurePolicy { get; set; }
        public bool HttpOnly { get; set; }
        public int SameSite { get; set; }

        public string LoginPath { get; set; }
        public string LogoutPath { get; set; }
        public string AccessDeniedPath { get; set; }
        public int ExpireTimeSpan { get; set; }
    }
}
