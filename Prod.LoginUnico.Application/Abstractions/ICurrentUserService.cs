namespace Prod.LoginUnico.Application.Abstractions;

public interface ICurrentUserService
{
    CurrentUser User { get; }

    bool IsInRole(string roleName);
}

public record CurrentUser(string UserId,
                          string JuridicPersonId,
                          string NaturalPersonId,
                          string UserName,
                          string Email,

                          string RemoteIpAddress,
                          string ApplicationId,
                          string DeviceName,

                          bool IsAuthenticated);