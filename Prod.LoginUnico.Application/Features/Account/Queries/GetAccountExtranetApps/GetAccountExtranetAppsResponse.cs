namespace Prod.LoginUnico.Application.Features.Account.Queries.GetAccountExtranetApps;

public class GetAccountExtranetAppsResponse
{
    public int applicationId { get; set; }

    public string? name { get; set; }

    public string? description { get; set; }

    public string? urlExtranet { get; set; }

    public byte[]? logo { get; set; }
}
