using System.Net.Sockets;
using System.Net;
using System.Security.Claims;
using Prod.LoginUnico.Application.Abstractions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Prod.LoginUnico.Web.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor? _httpContextAccessor;
    private readonly ILogger<CurrentUserService> _logger;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor, ILogger<CurrentUserService> logger)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;

        // App is probably initializing.
        if (_httpContextAccessor is null || _httpContextAccessor.HttpContext is null)
        {
            User = new CurrentUser(0.ToString(),
                0.ToString(),
                string.Empty, string.Empty, string.Empty, false);
            return;
        }


        var httpContext = _httpContextAccessor.HttpContext;
        var userId = 0.ToString();
        var personId = 0.ToString();
        var isAutenticated = httpContext!.User.Identity!.IsAuthenticated;

        if (isAutenticated)
        {
            /*userId = httpContext.User.Claims
                .FirstOrDefault(q => q.Type == ClaimTypes.Sid)!
                .Value ?? 0.ToString();

            personId = httpContext.User.Claims
                .FirstOrDefault(q => q.Type == ClaimTypes.NameIdentifier)!
                .Value ?? 0.ToString();*/

            userId = "0";
            personId = "0";
        }

        var userName = httpContext.User.Identity.Name ?? "Unknown";

        var ipAddress = httpContext.Request.Headers?["X-Forwarded-For"]
            .ToString();// ?? "0.0.0.0";

        if (string.IsNullOrEmpty(ipAddress))
        {
            ipAddress = Dns.GetHostEntry(Dns.GetHostName())
                .AddressList
                .Where(a => a.AddressFamily == AddressFamily.InterNetwork)
                .Select(w => w.ToString())
                .First();
        }

        var remoteIpAddress = httpContext.Connection.RemoteIpAddress;
        //_logger.LogInformation($"CurrentUserService " + $"> remoteIpAddress = ${remoteIpAddress}");

        var deviceName = "";
        if (remoteIpAddress != null)
        {
            try
            {
                deviceName = Dns.GetHostEntry(remoteIpAddress).HostName;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpContext.Connection: {@Connection}] " +
                    "[remoteIpAddress: {@remoteIpAddress}]",
                    httpContext.Connection,
                    remoteIpAddress);
            }
        }

        User = new CurrentUser(userId, personId, userName, ipAddress, deviceName, isAutenticated);
    }

    public CurrentUser User { get; }

    public bool IsInRole(string roleName) =>
        _httpContextAccessor!.HttpContext!.User.IsInRole(roleName);
}