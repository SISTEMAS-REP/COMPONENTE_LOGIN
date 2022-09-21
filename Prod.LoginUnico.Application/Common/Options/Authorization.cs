namespace Prod.LoginUnico.Application.Common.Options;

public class Authorization
{
    public string SecurityKey { get; set; }

    public int Expiration { get; set; }

    public string Issuer { get; set; }

    public string Audience { get; set; }
}
