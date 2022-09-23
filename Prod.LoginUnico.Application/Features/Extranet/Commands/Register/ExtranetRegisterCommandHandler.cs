using MediatR;
using Prod.LoginUnico.Application.Abstractions;
using Prod.LoginUnico.Application.Common.Exceptions;

namespace Prod.LoginUnico.Application.Features.Extranet.Commands.Auth;

public class ExtranetRegisterCommandHandler
    : IRequestHandler<ExtranetRegisterCommand>
{
    private readonly IRoleUnitOfWork _roleUnitOfWork;
    private readonly IExtranetUserRoleUnitOfWork _extranetUserRoleUnitOfWork;
    private readonly IPersonsService _personsService;
    private readonly IExtranetUserManager _extranetUserManager;

    public ExtranetRegisterCommandHandler(
        IRoleUnitOfWork roleUnitOfWork,
        IExtranetUserRoleUnitOfWork extranetUserRoleUnitOfWork,
        IPersonsService personsService,
        IExtranetUserManager extranetUserManager)
    {
        _roleUnitOfWork = roleUnitOfWork;
        _extranetUserRoleUnitOfWork = extranetUserRoleUnitOfWork;
        _personsService = personsService;
        _extranetUserManager = extranetUserManager;
    }

    public async Task<Unit>
        Handle(ExtranetRegisterCommand request, CancellationToken cancellationToken)
    {
        var applicationRole = (await _roleUnitOfWork.FindRoles(new() {
            id_aplicacion = request.id_aplicacion
        })).FirstOrDefault();

        if (applicationRole is null)
        {
            throw new NullException("No puede registrarse en esta aplicación");
        }

        var personId = await _personsService.InsertOrUpdatePerson(request);

        if (personId == 0)
        {
            throw new ApiException("No se puede " +
                (request.Id > 0 ? "actualizar" : "registrar") +
                $" la información de la persona.");
        }

        var userName = request.NroDocPerNatural;

        if (request.IdTipoPersona == 2)
        {
            userName = $"{request.NroDocumento}{userName}";
        }

        var user = await _extranetUserManager.FindByNameAsync(userName);

        if (user is not null)
        {
            var userRoles = await _extranetUserRoleUnitOfWork.FindExtranetUserRoles(new()
            {
                id_usuario_extranet = user.id_usuario_extranet,
                id_rol = applicationRole.id_rol,
                id_aplicacion = applicationRole.id_aplicacion,
            });

            if (userRoles.Count() > 0)
            {
                throw new BadRequestException("Usted ya se encuentra registrado en la aplicación");
            }
        }
        
        if (request.IdTipoPersona == 2)
        {
            //TODO: REGISTRAR USUARIO PERSONA JURÍDICA
        } 
        else
        {
            //TODO: REGISTRAR USUARIO PERSONA NATURAL
        }

        return Unit.Value;
    }
}