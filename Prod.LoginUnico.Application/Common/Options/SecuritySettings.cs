using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prod.LoginUnico.Application.Common.Options
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
