using Microsoft.Extensions.DependencyInjection;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Infrastructure.Managers;

namespace Prod.LoginUnico.Infrastructure;

public static class InfrastructureExtensions
{
    public static IServiceCollection
        AddInfrastructure(
        this IServiceCollection services)
    {

        services.AddScoped<ITokenManager, TokenManager>();
        services.AddScoped<IAuthManager, AuthManager>();

        return services;
    }
}
