using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Persistence.Context;

namespace Prod.LoginUnico.Persistence;

public static class PersistenceExtensions
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, string connectionString)
    {
        services
            .AddDbContext<ProdDbContext>(options => options.UseSqlServer(connectionString));

        services.AddScoped<IExtranetUserUnitOfWork, ExtranetUserUnitOfWork>();

        return services;
    }
}
