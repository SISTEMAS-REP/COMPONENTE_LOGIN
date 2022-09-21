namespace Prod.LoginUnico.Application.Abstractions;

public interface ICurrentUserService
{
    CurrentUser User { get; }

    bool IsInRole(string roleName);
}

public record CurrentUser(string UserId,
    string PersonId,
    string UserName,
    string RemoteIpAddress,
    string DeviceName,
    bool IsAuthenticated);