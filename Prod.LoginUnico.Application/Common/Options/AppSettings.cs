namespace Prod.LoginUnico.Application.Common.Options;

public class AppSettings
{
    public ConnectionStrings? ConnectionStrings { get; set; }

    public Authorization? Authorization { get; set; }

    public StaticFiles? StaticFiles { get; set; }

    public Cors? Cors { get; set; }

    public Services? Services { get; set; }

    public UserAudit? UserAudit { get; set; }

    public ReCaptcha ReCaptcha { get; set; }

    public SecuritySettings SecuritySettings { get; set; }
    public Urls Urls { get; set; }
}
