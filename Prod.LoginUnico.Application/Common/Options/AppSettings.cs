namespace Prod.LoginUnico.Application.Common.Options;

public class AppSettings
{
    public ConnectionStrings ConnectionStrings { get; set; }

    public Authorization Authorization { get; set; }

    public StaticFiles StaticFiles { get; set; }

    public Cors Cors { get; set; }
}
