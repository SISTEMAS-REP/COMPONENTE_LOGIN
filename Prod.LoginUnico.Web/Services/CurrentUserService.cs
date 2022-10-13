using System.Net.Sockets;
using System.Net;
using System.Security.Claims;
using Prod.LoginUnico.Application.Abstractions;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Common.Options;

namespace Prod.LoginUnico.Web.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor? _httpContextAccessor;
    private readonly ILogger<CurrentUserService> _logger;
    private readonly AppSettings _appSettings;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor, 
        ILogger<CurrentUserService> logger,
        IOptions<AppSettings> options)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
        _appSettings = options.Value;

        // App is probably initializing.
        if (_httpContextAccessor is null || _httpContextAccessor.HttpContext is null)
        {
            User = new CurrentUser(UserId: 0.ToString(),
                                   JuridicPersonId: 0.ToString(),
                                   NaturalPersonId: 0.ToString(),
                                   UserName: string.Empty,
                                   Email: string.Empty,

                                   RemoteIpAddress: string.Empty,
                                   ApplicationId: 0.ToString(),
                                   DeviceName: string.Empty,

                                   IsAuthenticated: false);
            return;
        }

        var httpContext = _httpContextAccessor.HttpContext;
        var isAutenticated = httpContext!.User.Identity!.IsAuthenticated;

        var userId = httpContext?.User?
            .FindFirstValue(ClaimTypes.NameIdentifier) 
            ?? _appSettings.UserAudit!.RoleId!;

        var juridicPersonId = httpContext?.User?
            .FindFirstValue("JuridicPersonId") ?? 0.ToString();

        var naturalPersonId = httpContext?.User?
            .FindFirstValue("NaturalPersonId") ?? 0.ToString();

        var userName = httpContext?.User?
                .FindFirstValue(ClaimTypes.Name) 
                ?? _appSettings.UserAudit!.UserName!;

        var email = httpContext?.User?
                .FindFirstValue(ClaimTypes.Email) 
                ?? string.Empty;

        var remoteIpAddress = httpContext?.Request.Headers["X-Forwarded-For"]
            .ToString() ?? string.Empty;
        if (string.IsNullOrEmpty(remoteIpAddress))
        {
            remoteIpAddress = Dns.GetHostEntry(Dns.GetHostName())
                .AddressList
                .Where(a => a.AddressFamily == AddressFamily.InterNetwork)
                .Select(w => w.ToString())
                .First() ?? string.Empty;
        }

        var applicationId = httpContext?.Request.Headers["X-Application-Id"]
            .ToString() ?? _appSettings.UserAudit?.ApplicationId!;

        var deviceName = string.Empty;
        var ipAddress = httpContext?.Connection.RemoteIpAddress;
        if (ipAddress is not null)
        {
            try
            {
                var hostEntry = Dns.GetHostEntryAsync(remoteIpAddress);
                deviceName = hostEntry.IsCompleted && !hostEntry.IsFaulted
                    ? hostEntry.Result.HostName
                    : string.Empty;
            }
            catch (Exception ex)
            {
                deviceName = string.Empty;
                _logger.LogError(ex, "[HttpContext.Connection: {@Connection}] " +
                    "[remoteIpAddress: {@remoteIpAddress}]",
                    httpContext?.Connection,
                    remoteIpAddress);
            }
        }

        User = new CurrentUser(UserId: userId,
                               JuridicPersonId: juridicPersonId,
                               NaturalPersonId: naturalPersonId,
                               UserName: userName,
                               Email: email,

                               RemoteIpAddress: remoteIpAddress,
                               ApplicationId: applicationId,
                               DeviceName: deviceName,

                               IsAuthenticated: isAutenticated);
    }

    public CurrentUser User { get; }

    public bool IsInRole(string roleName) =>
        _httpContextAccessor!.HttpContext!.User.IsInRole(roleName);
}