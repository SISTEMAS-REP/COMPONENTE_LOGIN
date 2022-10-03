using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Prod.LoginUnico.Application.Abstractions.Stores;
using Prod.LoginUnico.Application.Common.Options;
using Prod.LoginUnico.Persistence.Context;
using Prod.LoginUnico.Persistence.Stores;

namespace Prod.LoginUnico.Persistence;

public static class PersistenceExtensions
{
    public static IServiceCollection AddPersistence(
        this IServiceCollection services, 
        AppSettings options)
    {
        services
            .AddDbContext<ProdDbContext>(ctx =>
            ctx.UseSqlServer(options.ConnectionStrings?.DefaultConnection!));

        services.AddScoped<IExtranetUserUnitOfWork, ExtranetUserUnitOfWork>();
        services.AddScoped<IRoleUnitOfWork, RoleUnitOfWork>();
        services.AddScoped<IExtranetUserRoleUnitOfWork, ExtranetUserRoleUnitOfWork>();
        services.AddScoped<IApplicationUnitOfWork, ApplicationUnitOfWork>();

        return services;
    }
}
