using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Net;
using System.Text.Json;
using FluentValidation.AspNetCore;
using Prod.LoginUnico.Web.Services;
using Prod.LoginUnico.Web.Filters;
using Prod.LoginUnico.Application.Abstractions;

namespace Prod.LoginUnico.Web;

public static class PresentationExtensions
{
    public static IServiceCollection
        AddPresentation(this IServiceCollection services)
    {
        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddHttpContextAccessor();

        // Add services to the container.
        services.AddControllersWithViews(options =>
            options.Filters.Add<ApiExceptionFilterAttribute>());

        ValidatorOptions.Global.DisplayNameResolver = (type, member, expression)
            => member?.Name ?? null;

        services
            .AddFluentValidationAutoValidation();

        // Customise default API behaviour
        services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);

        return services;
    }

    public static void
        ConfigureExceptionHandler<T>(this WebApplication application, ILogger<T> logger)
    {
        application.UseExceptionHandler(builder =>
        {
            builder.Run(async context =>
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = MediaTypeNames.Application.Json;

                var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                if (contextFeature != null)
                {
                    logger.LogError(contextFeature.Error, "[{@RequestName}] " +
                        "[User {@User} Unhandled Exception for Request {@Request}.] " +
                        "[ExMessage: {@Message}]",
                        context.Request.Method,
                        context.Session,
                        context.Request,
                        contextFeature.Error.Message);

                    //logger.LogError(contextFeature.Error.Message);

                    await context.Response.WriteAsync(JsonSerializer.Serialize(new
                    {
                        Title = "InternalServerError",
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                        StatusCode = context.Response.StatusCode,
                        Detail = contextFeature.Error.Message,
                    }));
                }
            });
        });
    }
}
