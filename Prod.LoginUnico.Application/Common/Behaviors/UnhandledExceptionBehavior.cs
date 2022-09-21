using MediatR;
using Microsoft.Extensions.Logging;
using Prod.LoginUnico.Application.Abstractions;

namespace Prod.LoginUnico.Application.Common.Behaviors;

public class UnhandledExceptionBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    private readonly ILogger<TRequest> _logger;
    private readonly ICurrentUserService _currentUserService;

    public UnhandledExceptionBehavior(ILogger<TRequest> logger,
        ICurrentUserService currentUserService)
    {
        _logger = logger;
        _currentUserService = currentUserService;
    }

    public async Task<TResponse> Handle(TRequest request,
        CancellationToken cancellationToken,
        RequestHandlerDelegate<TResponse> next)
    {
        try
        {
            return await next();
        }
        catch (Exception ex)
        {
            var requestName = typeof(TRequest).Name;

            _logger.LogError(ex, "[{@RequestName}] " +
                "[User {@User} Unhandled Exception for Request {@Request}.] " +
                "[ExMessage: {@Message}]",
                requestName,
                _currentUserService.User,
                request,
                ex.Message);
            throw;
        }
    }
}