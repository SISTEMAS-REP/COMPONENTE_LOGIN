using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using se = Prod.ServiciosExternos;
using Prod.ComponenteLoginAngular.MVC.Controllers;
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
using Prod.ComponenteLogin.MVC.Configuracion;
using PersonaResponse = Prod.ComponenteLoginAngular.MVC.Model.PersonaResponse;
using Microsoft.AspNetCore.Authorization;
using Prod.ComponenteLogin.Entidades.AplicacionUsuario;
using Newtonsoft.Json.Linq;
using Prod.ComponenteLogin.Entidades;
using Prod.ServiciosExternos.SNE;
using StatusResponse = Release.Helper.StatusResponse;
using Prod.ComponenteLogin.MVC.Configuracion.Proxy;

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
        private readonly IDomicilioElectronicoServicio domicilioElectronicoServicio;
        private readonly ComponenteLoginProxy componenteLoginProxy;

        public ComponenteLoginController(
            ILogger<ComponenteLoginController> logger,
			IPersonasServicio personasServicio,
            IProduceVirtualServicio produceVirtualServicio,
            IRolesServicio rolesServicio,
            IReniecServicio reniecServicio,
            ISunatServicio sunatServicio,
            LoginProxy loginProxy,
            AppConfig appConfig,
            IDomicilioElectronicoServicio domicilioElectronicoServicio,
            ComponenteLoginProxy componenteLoginProxy
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
            this.domicilioElectronicoServicio = domicilioElectronicoServicio;
            this.componenteLoginProxy = componenteLoginProxy;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("RegistroPersona")]
        public IActionResult RegistroPersona(PersonaRequest request)
        {
			var respuesta = new StatusResponse();
            var resPersona = new sep.StatusResponse();
            sep.PersonaRequest persona = null;


            var rolbyaplicacion = this.componenteLoginProxy.GetRolAdministradoByAplicacion(request.id_aplicacion.ToString());

            if (!rolbyaplicacion.Success)
            {
                respuesta.Success = false;
                respuesta.Messages.Add("No puede registrarse en este aplicacitivo.");
                return Ok(respuesta);
            }

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
                    usuario = appConfig.RegistroUsuario.Usuario,
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
                    usuario = "login_unico"
                };
                resPersona = personasServicio.ActualizarPersonaById(persona);
            }



            if (resPersona.Success && request.Flag == "A")
            {
                var result = new StatusResponse<Prod.ServiciosExternos.PRODUCE_VIRTUAL.OperationResult>();
                var result1 = new StatusResponse<Prod.ServiciosExternos.PRODUCE_VIRTUAL.Roles.Paginado<Prod.ServiciosExternos.PRODUCE_VIRTUAL.Roles.UsuarioRolesResponse>>();
                var userName = "";

                if (request.IdTipoPersona == (int)TIPO_PERSONA.JURIDICA)
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
                        IdAplicion = rolbyaplicacion.Data.id_aplicacion, //int.Parse(appConfig.RegistroUsuario.IdAplicacion),
                        IdRol = rolbyaplicacion.Data.id_rol, //int.Parse(appConfig.RegistroUsuario.IdRol),
                        Tipo = roles.TipoRol.Extranet
                    }, 1, 10);

                    if (result1.Success)
                    {
                        if (result1.Data.TotalItems > 0)
                        {
                            respuesta.Success = false;
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
                        UserRegister = appConfig.RegistroUsuario.Usuario,
                        id_rol = rolbyaplicacion.Data.id_rol, // int.Parse(appConfig.RegistroUsuario.IdRol),
                        id_aplicacion = rolbyaplicacion.Data.id_aplicacion, //int.Parse(appConfig.RegistroUsuario.IdAplicacion),
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
                        UserRegister = appConfig.RegistroUsuario.Usuario,
                        id_rol = rolbyaplicacion.Data.id_rol, // int.Parse(appConfig.RegistroUsuario.IdRol),
                        id_aplicacion = rolbyaplicacion.Data.id_aplicacion, //int.Parse(appConfig.RegistroUsuario.IdAplicacion),
                        ingresarClave = request.Contrasena
                    });

                }
                respuesta.Data = resPersona;
                respuesta.Success = result.Success;
                respuesta.Messages = result.Messages;


            }

            return Ok(respuesta);
        }

        [HttpPost]
        [Route("buscarReniec")]
        public IActionResult buscarReniec(PersonaRequest request)
        {
            var reniec = _reniecServicio.Buscar(request.NroDocumento);
            return Ok(reniec);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("IniciarSesionExtranet")]
        public IActionResult IniciarSesionExtranetAsync([FromBody] ComponenteLogin.MVC.Configuracion.LoginRequest request)
        {
            var sr = loginProxy.IniciarSesionExtranet(request);
            return Ok(sr);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("RecuperarContrasena")]
        public IActionResult RecuperarContrasena([FromBody] ComponenteLogin.MVC.Configuracion.LoginRequest request)
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
                            Url = appConfig.Urls.URL_PRODUCE_VIRTUAL_WEB + "Verificaciones/EmailLoginUnico/[" + request.numeroDocumento + "]",
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
                        Url = appConfig.Urls.URL_PRODUCE_VIRTUAL_WEB + "Verificaciones/EmailLoginUnico/[" + request.numeroDocumento + "]",
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

        [AllowAnonymous]
        [HttpPost]
        [Route("BuscarPersonaEmpresa")]
        public StatusResponse<PersonaResponse> BuscarPersonaEmpresa([FromBody] PersonaRequest request)
        {
            var sr = new StatusResponse<PersonaResponse> { Success = false };
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

        [AllowAnonymous]
        [HttpPost]
        [Route("CambiarContrasena")]
        public IActionResult CambiarContrasena([FromBody] Prod.ComponenteLoginAngular.MVC.Model.LoginRequest request)
        {
            var sr = new StatusResponse();
            var validacion = produceVirtualServicio.VerificarCorreoValidado(new ConfirmacionCodigoEmailRequest
            {
                Email = request.email,
                Identificador = Guid.Parse(request.id)
            });
            if (validacion.Success)
            {
                var password = produceVirtualServicio.CambioClaveUsuario(request.dni, request.clave);
                if (password.Success)
                {
                    sr.Success = true;
                }
                else
                {
                    sr.Messages.Add("Ocurrió un error al cambiar la contraseña");
                }
            }
            else
            {
                sr.Messages.Add("Ocurrió un error en la validación de correo");
            }
            return Ok(sr);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("UpdateCorreoTelefonoPersona")]
        public IActionResult UpdateCorreoTelefonoPersona([FromBody] PersonaRequest request)
        {
            var sr = produceVirtualServicio.UpdateCorreoTelefonoPersona(request.Id,request.Email,request.Telefono,request.idContactoExtranet);
            return Ok(sr);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Obtener_Imagen_By_Aplicacion")]
        public IActionResult Obtener_Imagen_By_Aplicacion([FromBody] PersonaRequest request)
        {
            StatusResponse response = new StatusResponse();
            byte[] numArray;
            try
            {
                var carpetaRutaLogo = System.IO.Path.Combine(appConfig.RegistroTramite.RutaImagenLogo, request.id_aplicacion + ".png");
                numArray = System.IO.File.ReadAllBytes(carpetaRutaLogo);
                response.Data = numArray;
                response.Success = true;
            }
            catch (System.IO.FileNotFoundException ex)
            {
                var carpetaRutaLogoError = System.IO.Path.Combine(appConfig.RegistroTramite.RutaImagenLogo, "Logo_Temp.png");
                numArray = System.IO.File.ReadAllBytes(carpetaRutaLogoError);
                response.Data = numArray;
                response.Success = false;
            }
            return Ok(response);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("obtenerDatoAplicacionByUsuario")]
        public IActionResult obtenerDatoAplicacionByUsuario([FromBody] PersonaRequest request)
        {
            var user = new StatusResponse<UsuarioExtranet>();
            var userName = "";
            StatusResponse aplicaciones = new StatusResponse();
            try
            {
                if (request.IdTipoPersona == (int)TIPO_PERSONA.JURIDICA)
                {
                    userName = request.NroDocumento + request.NroDocPerNatural;
                    user = produceVirtualServicio.GetUsuarioUserName(userName);
                }
                else if (request.IdTipoPersona == (int)TIPO_PERSONA.NATURAL)
                {
                    userName = request.NroDocPerNatural;
                    user = produceVirtualServicio.GetUsuarioUserName(userName);
                }

                var url_aplicacion_actual = "";
                var nombre_aplicacion = "";
                var existe_aplicacion = this.componenteLoginProxy.GetApliacionesByUsuario(userName);

                foreach (var elemento in existe_aplicacion.Data)
                {
                    if (request.id_aplicacion == elemento.id_aplicacion)
                    {
                        url_aplicacion_actual = elemento.url_extranet;
                        nombre_aplicacion = elemento.nombre;
                    }
                }

                if (url_aplicacion_actual == "")
                {

                    aplicaciones.Success = false;
                    aplicaciones.Messages.Add("El usuario no tiene acceso a el aplicacion " + nombre_aplicacion);
                    return Ok(aplicaciones);
                }
              
                dynamic jsonToken = new JObject();
                jsonToken.userName = userName;
                jsonToken.type = "E";
                jsonToken.dni = request.IdTipoPersona == (int)TIPO_PERSONA.JURIDICA ? request.NroDocPerNatural : request.NroDocumento;
                jsonToken.time = DateTime.Now;
                jsonToken.appId = request.id_aplicacion;
                string tokenEncrypted = Functions.Encrypt(jsonToken.ToString());
                string customUrl = url_aplicacion_actual;
                if (customUrl.EndsWith("/"))
                {
                    customUrl = customUrl.TrimEnd('/');
                }
                aplicaciones.Data = customUrl + string.Format("?var={0}", tokenEncrypted);
            }
            catch (Exception ex)
            {
                aplicaciones.Success = false;
                aplicaciones.Messages.Add(ex.Message);
            }

            return Ok(aplicaciones);
        }


















        [HttpPost]
        [Route("Listar_usuarios_representante_legal")]
        public IActionResult Listar_usuarios_representante_legal()
        {
            var user = this.GetUser();
            var result = this.produceVirtualServicio.GetUsuariosAdicionalesByRuc(user.RUC);
            return Ok(result);
        }

        [HttpPost]
        [Route("ObtenerPersonaPorRepresentanteLegal")]
        public IActionResult ObtenerPersonaPorRepresentanteLegal([FromBody] PersonaRequest request)
        {
            var result = personasServicio.ObtenerPersona(new ServiciosExternos.Personas.PersonaGeneralRequest { nro_documento = request.NroDocumento });
            return Ok(result);
        }

        [HttpPost]
        [Route("CambiarEstadoUsuarioPorRepresentanteLegal")]
        public IActionResult CambiarEstadoUsuarioPorRepresentanteLegal([FromBody] UsuarioResponse request)
        {
            Release.Helper.StatusResponse response = new Release.Helper.StatusResponse { Success = false };
            var user = this.GetUser();
            try
            {
                if (request.id_persona != 0)
                {
                    ServiciosExternos.Personas.PersonaRequest persona = new ServiciosExternos.Personas.PersonaRequest()
                    {
                        id = request.id_persona,
                        celular = request.telefono,
                        email = request.correo,
                        usuario = "VUSP",
                        nro_docpernatural = request.NumeroDocumento,
                        id_tipo_persona = 1
                    };
                    var result = this.personasServicio.ActualizarPersonaById(persona);
                    var cod_usuario = user.RUC + request.NumeroDocumento;

                    ConsentimientoRequest resp = new ConsentimientoRequest();
                    resp.user_name = cod_usuario;
                    resp.id_persona = request.id_persona;
                    var result_id_usuario_extranet = this.componenteLoginProxy.p_Obtener_id_usuario_extranet(resp);
                    var dato_id_usuario_extranet = (UserInformationRequest)result_id_usuario_extranet.Data;


                    var usuario = new List<NuevoUsuarioRequest>();
                    usuario.Add(new NuevoUsuarioRequest()
                    {
                        id_contacto_extranet = Convert.ToInt32(dato_id_usuario_extranet.id_usuario_extranet),
                        direccion_electronica = request.correo,
                        telefono = request.telefono
                    });

                    this.domicilioElectronicoServicio.ActualizarUsuarioJuridicoCorreo(Convert.ToInt32(user.IdUsuario), user.RUC, usuario.ToArray(), "VUSP");
                    var estadoCuenta = request.activo? 1 : 2;
                    this.domicilioElectronicoServicio.ActivarDesactivarCuenta(user.RUC, Convert.ToInt32(dato_id_usuario_extranet.id_usuario_extranet), "VUSP", estadoCuenta, "Usuario desactivado en VUSP por un Representante Legal de la empresa, codigo:" + user.UserName);


                    var resultCambioEstado = this.produceVirtualServicio.ActivarDesactivarUsuario(cod_usuario, request.activo);
                    this.produceVirtualServicio.UpdateCorreoTelefonoPersona(request.id_persona, request.correo, request.telefono, Convert.ToInt32(dato_id_usuario_extranet.id_usuario_extranet));
                    if (resultCambioEstado.Success)
                    {
                        var estado = request.activo ? "activo" : "desactivo";
                        response.Success = true;
                        response.Messages.Add("El usuario se " + estado + " correctamente.");
                    }
                    else
                    {
                        var estado = request.activo ? "activo" : " desactivo";
                        response.Messages.Add("");
                        response.Messages.Add("El usuario no se pudo " + estado + ".");
                    }
                }
                else
                {
                    response.Messages.Add("El usuario no se encuentra registrado.");
                }
            }
            catch (Exception ex)
            {
                response.Messages.Add(ex.Message);
            }
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("RegistrarNuevoUsuario")]
        public IActionResult RegistrarNuevoUsuario([FromBody] PersonaRequest request)
        {
            Release.Helper.StatusResponse response = new Release.Helper.StatusResponse { Success = false };
            try
            {
                var user = this.GetUser();
                if (request.Id == 0)
                {
                    var obj = new ServiciosExternos.Personas.PersonaRequest()
                    {

                        id_sector = 1,
                        nro_documento = request.NroDocumento,
                        nro_docpernatural = request.NroDocPerNatural,
                        nombres = request.Nombres,
                        apellidos = request.Apellidos,
                        celular = request.Celular,
                        email = request.Email,
                        razon_social = "",
                        codigo_departamento = request.CodigoDepartamento,
                        codigo_provincia = request.CodigoProvincia,
                        codigo_distrito = request.CodigoDistrito,
                        usuario = "VUSP",
                        direccion = request.Direccion,
                        flag = "A",
                        telefono = request.Celular,
                        id_tipo_identificacion = 1,
                        id_tipo_persona = 1,
                        representante_legal = "",
                        nro_documento_representante = "",
                        id_tipo_identificacion_rep_leg = 0,
                    };

                    var result_persona = personasServicio.RegistrarAdministrado(obj);

                }
                else
                {
                    var obj = new ServiciosExternos.Personas.PersonaRequest()
                    {

                        id = request.Id,
                        nro_docpernatural = request.NroDocPerNatural,
                        nombres = request.Nombres,
                        apellidos = request.Apellidos,
                        celular = request.Celular,
                        direccion = request.Direccion,
                        codigo_departamento = request.CodigoDepartamento,
                        codigo_provincia = request.CodigoProvincia,
                        codigo_distrito = request.CodigoDistrito,
                        email = request.Email,
                        usuario = "VUSP",
                        id_tipo_persona = 1
                    };
                    this.personasServicio.ActualizarPersonaById(obj);
                }


                var servicio = this.produceVirtualServicio.CrearUsuarioJuridica(new CrearUsuarioJuridicaRequest()
                {
                    Dni = request.NroDocPerNatural,
                    Email = request.Email,
                    PhoneNumber = request.Celular,
                    Ruc = user.RUC,
                    UserRegister = "PV"
                });
                if (servicio.Success)
                {
                    var usuario = user.RUC + request.NroDocPerNatural;
                    this.produceVirtualServicio.UpdateUserSector(usuario, 3);
                    var codigo_usuario = this.produceVirtualServicio.AsignarUsuarioOtros(usuario);

                    var resul_nuevo_usuario = this.domicilioElectronicoServicio.GuardarNuevoUsuario(Convert.ToInt32(user.IdUsuario), Convert.ToInt32(codigo_usuario.Data), user.RUC, request.Email, "PV", true, true, request.Celular);
                    response.Success = true;
                    response.Messages.Add("El registro se guardo correctamente");
                }
            }
            catch (Exception ex)
            {
                response.Success = true;
            }


            return Ok(response);
        }
    }

}
