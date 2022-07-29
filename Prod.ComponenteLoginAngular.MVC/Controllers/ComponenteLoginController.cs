using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using se = Prod.ServiciosExternos;
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
using Prod.ComponenteLogin.MVC.Configuracion.Proxy;
using Prod.ComponenteLogin.MVC.Configuracion;
using PersonaResponse = Prod.ComponenteLoginAngular.MVC.Model.PersonaResponse;

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
        private readonly LoginProxy loginProxy;
        private readonly AppConfig appConfig;

        public ComponenteLoginController(
            ILogger<ComponenteLoginController> logger,
			IPersonasServicio personasServicio,
            IProduceVirtualServicio produceVirtualServicio,
            IRolesServicio rolesServicio,
            IReniecServicio reniecServicio,
            ISunatServicio sunatServicio,
            LoginProxy loginProxy,
            AppConfig appConfig
            )
        {
            _logger = logger;
            this.personasServicio = personasServicio;
            this.produceVirtualServicio = produceVirtualServicio;
            this.rolesServicio = rolesServicio;
            this._reniecServicio = reniecServicio;
            this._sunatServicio = sunatServicio;
            this.loginProxy = loginProxy;
            this.appConfig = appConfig;
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


        [HttpPost]
        [Route("IniciarSesionExtranet")]
        public IActionResult IniciarSesionExtranetAsync([FromBody] ComponenteLogin.MVC.Configuracion.Proxy.LoginRequest request)
        {
            var sr = loginProxy.IniciarSesionExtranet(request);
            return Ok(sr);

        }


        [HttpPost]
        [Route("RecuperarContrasena")]
        public IActionResult RecuperarContrasena([FromBody] ComponenteLogin.MVC.Configuracion.Proxy.LoginRequest request)
        {
            var guid = Guid.NewGuid();
            var sr = new StatusResponse();
            var user = new StatusResponse<UsuarioExtranet>();
            user = produceVirtualServicio.GetUsuarioUserName(request.numeroDocumento);

            if (user.Success)
            {
                if (user.Success && !string.IsNullOrEmpty(request.numeroDocumento) && (request.numeroDocumento.Length == 8) && (user.Data.PersonaNatural != null))
                {
                    if (user.Data.PersonaNatural.Email == request.email)
                    {
                        var correo = produceVirtualServicio.EnviarCorreoVerificacion(new CorreoConfirmacionRequest
                        {
                            Url = appConfig.Urls.URL_PRODUCE_VIRTUAL_WEB + "Verificaciones/EmailVUSP/[" + request.numeroDocumento + "]",
                            Correo = request.email,
                            Identificador = guid
                        });
                        if (correo.Success)
                        {
                            sr.Success = true;
                        }
                    }
                    else
                    {
                        sr.Success = true;
                        sr.Messages.Add("El correo ingresado no coincide con el correo registrado al usuario.");
                    }
                }
                else if (user.Success && !string.IsNullOrEmpty(request.numeroDocumento) && (request.numeroDocumento.Length == 11) && (user.Data.IdPersonaJuridica != null))
                {
                    var correo = produceVirtualServicio.EnviarCorreoVerificacion(new CorreoConfirmacionRequest
                    {
                        Url = appConfig.Urls.URL_PRODUCE_VIRTUAL_WEB + "Verificaciones/EmailVUSP/[" + request.numeroDocumento + "]",
                        Correo = request.email,
                        Identificador = guid
                    });
                    if (correo.Success)
                    {
                        sr.Success = true;
                    }

                }
            }
            else
            {
                sr.Success = true;
                sr.Messages.Add("Error al obtener información del usuario, por favor vuelve a intentar en unos minutos.");
            }
            return Ok(sr);
        }

        [HttpPost]
        [Route("BuscarPersonaEmpresa")]
        public StatusResponse<PersonaResponse> BuscarPersonaEmpresa([FromBody] PersonaRequest request)
        {
            var sr = new StatusResponse<PersonaResponse>();
            var persona = personasServicio.ObtenerPersona(new se.Personas.PersonaGeneralRequest
            {
                nro_documento = request.NroDocumento
            });

            if (persona.Success && persona.Data?.id_persona > 0)
            {
                sr.Success = true;
                sr.Data = new PersonaResponse()
                {
                    Id = persona.Data.id_persona,
                    IdTipoIdentificacion = persona.Data.id_tipo_identificacion,
                    IdTipoPersona = persona.Data.id_tipo_persona,
                    RazonSocial = persona.Data.razon_social,
                    Nombres = persona.Data.nombres,
                    Apellidos = persona.Data.apellidos,
                    Direccion = persona.Data.direccion,
                    CodigoDepartamento = persona.Data.codigo_departamento,
                    CodigoProvincia = persona.Data.codigo_provincia,
                    CodigoDistrito = persona.Data.codigo_distrito,
                    Email = persona.Data.email,
                    Celular = persona.Data.celular
                };
                return sr;
            }
            //Validar Sunat
            if (request.IdTipoIdentificacion == (int)TIPO_DOCUMENTO_PERSONA.RUC)
            {

                var data = _sunatServicio.Buscar(request.NroDocumento);
                if (data.Success)
                {
                    sr.Success = true;
                    sr.Data = new PersonaResponse()
                    {
                        //EsValidoReniec = true,
                        RazonSocial = data.Data.razonSocial,
                        Direccion = string.IsNullOrEmpty(data.Data.domicilio) ? "-" : data.Data.domicilio,
                        CodigoDepartamento = string.IsNullOrEmpty(data.Data.departamento) ? "00" : data.Data.departamento,
                        CodigoProvincia = string.IsNullOrEmpty(data.Data.departamento) ? "00" : (string.IsNullOrEmpty(data.Data.provincia) ? "00" : (data.Data.provincia.Substring(data.Data.provincia.Length - 2, 2))),
                        CodigoDistrito = (string.IsNullOrEmpty(data.Data.departamento) || string.IsNullOrEmpty(data.Data.provincia)) ? "00" : (string.IsNullOrEmpty(data.Data.ubigeo) ? "00" : (data.Data.ubigeo.Substring(data.Data.ubigeo.Length - 2, 2)))
                    };
                    //Validar Servicio Persona
                    //var respuestaAccesos = _AccesosServicio.GetAdministradoFiltros(new AccesoRequest { tipoBusqueda = 2, filtro = data.Data.numeroRuc });
                    //sr.Data.IdPersona = respuestaAccesos.userName;
                }
            }
            //Validar Reniec
            else if (request.IdTipoIdentificacion == (int)TIPO_DOCUMENTO_PERSONA.DNI)
            {
                var data = _reniecServicio.Buscar(request.NroDocumento);
                if (data.Success)
                {
                    sr.Success = true;
                    sr.Data = new PersonaResponse()
                    {
                        //EsValidoReniec = true,
                        Nombres = data.Data.nombre,
                        Apellidos = (data.Data.apellidoPaterno + " " + data.Data.apellidoMaterno ?? "").Trim(),
                        Direccion = string.IsNullOrEmpty(data.Data.direccion) ? "-" : data.Data.direccion,
                        CodigoDepartamento = string.IsNullOrEmpty(data.Data.codigoDepartamento) ? "00" : data.Data.codigoDepartamento,
                        CodigoProvincia = string.IsNullOrEmpty(data.Data.codigoDepartamento) ? "00" : (string.IsNullOrEmpty(data.Data.codigoProvincia) ? "00" : (data.Data.codigoProvincia.Substring(data.Data.codigoProvincia.Length - 2, 2))),
                        CodigoDistrito = (string.IsNullOrEmpty(data.Data.codigoDistrito) || string.IsNullOrEmpty(data.Data.codigoProvincia)) ? "00" : (string.IsNullOrEmpty(data.Data.codigoDistrito) ? "00" : (data.Data.codigoDistrito.Substring(data.Data.codigoDistrito.Length - 2, 2)))
                    };
                    //Validar Servicio Persona
                    //var respuestaAccesos = _AccesosServicio.GetAdministradoFiltros(new AccesoRequest { tipoBusqueda = 2, filtro = data.Data.dni });
                    //sr.Data.IdPersona = respuestaAccesos.userName;
                }
            }
            return sr;
        }

    }
  
}
