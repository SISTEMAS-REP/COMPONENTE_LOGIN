using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Options;

namespace Prod.LoginUnico.Application.Common.Behaviors;

public class LoggingBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;
    private readonly AppSettings _options;

    public LoggingBehavior(ICurrentUserService currentUserService,
        ILogger<LoggingBehavior<TRequest, TResponse>> logger,
        IOptions<AppSettings> options)
    {
        _logger = logger;
        _currentUserService = currentUserService;
        _options = options.Value;
    }

    public async Task<TResponse> Handle(TRequest request,
        CancellationToken cancellationToken,
        RequestHandlerDelegate<TResponse> next)
    {
        _logger.LogInformation("[{@RequestName}] " +
                "[User {@User} Handling for Request {@Request}]",
                typeof(TRequest).Name,
                _currentUserService.User,
                request);

        var response = await next();

        _logger.LogInformation("[{@RequestName}] " +
                "[User {@User} Handled for Response {@Response}]",
                typeof(TResponse).Name,
                _currentUserService.User,
                response);

        return response;
    }
}