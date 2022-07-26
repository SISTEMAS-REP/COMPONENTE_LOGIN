using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Prod.ComponenteLoginAngular.MVC.Controllers.Core;
using Prod.ComponenteLoginAngular.MVC.Model;
using Prod.ServiciosExternos;
using Prod.ServiciosExternos.PRODUCE_VIRTUAL;
using Release.Helper;
using System;
using System.Collections;
using System.Collections.Generic;
using Http = Microsoft.AspNetCore.Http;
using sep = Prod.ServiciosExternos.Personas;
using roles = Prod.ServiciosExternos.PRODUCE_VIRTUAL.Roles;
using Prod.ServiciosExternos.PRODUCE_VIRTUAL.Roles;
using Microsoft.AspNetCore.Authorization;

namespace Prod.ComponenteLoginAngular.MVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComponenteLoginController :  CustomBaseController
    {
        private readonly ILogger<ComponenteLoginController> _logger;
        private readonly IPersonasServicio personasServicio;
        private readonly IProduceVirtualServicio produceVirtualServicio;
        private readonly IRolesServicio rolesServicio;
        private readonly IReniecServicio _reniecServicio;
        private readonly ISunatServicio _sunatServicio;

        public ComponenteLoginController(
            ILogger<ComponenteLoginController> logger,
			IPersonasServicio personasServicio,
            IProduceVirtualServicio produceVirtualServicio,
            IRolesServicio rolesServicio,
            IReniecServicio reniecServicio,
            ISunatServicio sunatServicio
            )
        {
            _logger = logger;
            this.personasServicio = personasServicio;
            this.produceVirtualServicio = produceVirtualServicio;
            this.rolesServicio = rolesServicio;
            this._reniecServicio = reniecServicio;
            this._sunatServicio = sunatServicio;
        }

        [HttpPost]
        [Route("RegistroPersona")]
        public IActionResult RegistroPersona(PersonaRequest request)
        {
			var respuesta = new StatusResponse();
            var resPersona = new sep.StatusResponse();
            sep.PersonaRequest persona = null;

            if (request.Id == 0)
            {
                persona = new sep.PersonaRequest()
                {
                    id_sector = request.IdSector,
                    id_tipo_persona = request.IdTipoPersona,
                    codigo_departamento = request.CodigoDepartamento,
                    codigo_provincia = request.CodigoProvincia,
                    codigo_distrito = request.CodigoDistrito,
                    id_tipo_identificacion = request.IdTipoIdentificacion,
                    razon_social = !string.IsNullOrEmpty(request.RazonSocial) ? request.RazonSocial : "-",
                    nombres = !string.IsNullOrEmpty(request.Nombres) ? request.Nombres : "-",
                    apellidos = !string.IsNullOrEmpty(request.Apellidos) ? request.Apellidos : "-",
                    nro_documento = request.NroDocumento,
                    direccion = request.Direccion,
                    telefono = string.IsNullOrEmpty(request.Telefono) ? "" : request.Telefono,
                    email = string.IsNullOrEmpty(request.Email) ? "" : request.Email,
                    flag = request.Flag,
                    usuario = "VUSP",
                    celular = string.IsNullOrEmpty(request.Celular) ? "" : request.Celular,
                    representante_legal = "",
                    nro_documento_representante = "",
                    nro_docpernatural = request.NroDocPerNatural
                };
                resPersona = personasServicio.RegistrarAdministrado(persona);
            }
            else
            {
                persona = new sep.PersonaRequest()
                {
                    id = request.Id,
                    codigo_departamento = request.CodigoDepartamento,
                    codigo_provincia = request.CodigoProvincia,
                    codigo_distrito = request.CodigoDistrito,
                    direccion = request.Direccion,
                    telefono = string.IsNullOrEmpty(request.Telefono) ? "" : request.Telefono,
                    email = string.IsNullOrEmpty(request.Email) ? "" : request.Email,
                    celular = string.IsNullOrEmpty(request.Celular) ? "" : request.Celular,
                    nro_docpernatural = request.NroDocPerNatural,
                    usuario = "VUSP"
                };
                resPersona = personasServicio.ActualizarPersonaById(persona);
            }


            if (resPersona.Success && request.Flag == "A")
            {
                var result = new StatusResponse<Prod.ServiciosExternos.PRODUCE_VIRTUAL.OperationResult>();
                var result1 = new StatusResponse<Prod.ServiciosExternos.PRODUCE_VIRTUAL.Roles.Paginado<Prod.ServiciosExternos.PRODUCE_VIRTUAL.Roles.UsuarioRolesResponse>>();
                var userName = "";

                if (request.IdTipoPersona == 2) //(int)TIPO_PERSONA.JURIDICA
                {
                    userName = request.NroDocumento + request.NroDocPerNatural;
                }
                else
                {
                    userName = request.NroDocPerNatural;
                }

                var user = produceVirtualServicio.GetUsuarioUserName(userName);
                if (user.Data != null)
                {
                    result1 = rolesServicio.GetUsuarioRoles(
                    new roles.UsuarioRolesRequest()
                    {
                        CodigoUsuario = request.IdTipoPersona == 2 ? user.Data.IdPersonaNatural : int.Parse(resPersona.Value),
                        IdAplicion = 90,
                        IdRol = 687,
                        Tipo = roles.TipoRol.Extranet
                    }, 1, 10);

                    if (result1.Success)
                    {
                        if (result1.Data.TotalItems > 0)
                        {
                            respuesta.Success = result1.Success;
                            respuesta.Messages.Add("Este usuario ya existe como administrado");
                            return Ok(respuesta);
                        }
                    }
                }



                if (request.IdTipoPersona == 2) //(int)TIPO_PERSONA.JURIDICA
                {
                    result = produceVirtualServicio.CrearPersonaJuridicaByAplicacion(new CrearUsuarioJuridicaRequest
                    {
                        Dni = request.NroDocPerNatural,
                        Email = request.Email,
                        Ruc = request.NroDocumento,
                        PhoneNumber = request.Celular,
                        UserRegister = "VSP", //appConfig.RegistroUsuario.Usuario,
                        id_rol = 687,// int.Parse(appConfig.RegistroUsuario.IdRol),
                        id_aplicacion = 90,// int.Parse(appConfig.RegistroUsuario.IdAplicacion),
                        ingresarClave = request.Contrasena
                    });
                }
                else
                {
                    result = produceVirtualServicio.CrearPersonaNaturalByAplicacion(new CrearUsuarioNaturalRequest
                    {
                        Dni = request.NroDocPerNatural,
                        Email = request.Email,
                        PhoneNumber = request.Celular,
                        UserRegister = "VSP", //appConfig.RegistroUsuario.Usuario,
                        id_rol = 687,// int.Parse(appConfig.RegistroUsuario.IdRol),
                        id_aplicacion = 90,// int.Parse(appConfig.RegistroUsuario.IdAplicacion),
                        ingresarClave = request.Contrasena
                    });
                }
                respuesta.Success = true;

            }
            return _Response(respuesta);
        }

        [HttpPost]
        [Route("buscarReniec")]
        public IActionResult buscarReniec(PersonaRequest request)
        {
            var reniec = _reniecServicio.Buscar(request.NroDocumento);
            return _Response(reniec);
        }
        //[AllowAnonymous]
        //[HttpPost]
        //[Route("IniciarSesionExtranet")]
        //public IActionResult IniciarSesionExtranetAsync([FromBody] LoginRequest request)
        //{
        //	//var sr = loginProxy.IniciarSesionExtranet(request);
        //	//return Ok(sr);

        //}


    }

    
}
