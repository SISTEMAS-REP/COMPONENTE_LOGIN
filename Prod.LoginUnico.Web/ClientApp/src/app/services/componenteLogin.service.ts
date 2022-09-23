import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComponenteLoginService {
  baseUrl = `${environment.apiUrl}/extranet`;
  constructor() { }

  async obtenerImagenByAplicacion(request: { id_aplicacion: number; }) {
    const formData = {...request};
    const url = `${this.baseUrl}/logo`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }


  async Auth(request: { PersonType: number; RucNumber: string; DocumentNumber: string; Password: string; RememberMe: Boolean; ReturnUrl: string; applicationId: number }) {
    const formData = {...request};
    const url = `${this.baseUrl}/Auth`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async IniciarSesionExtranet(request: { dni: string; clave: string; }) {
    const formData = {...request};
    const url = `${this.baseUrl}/IniciarSesionExtranet`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async obtenerDatoAplicacionByUsuario(request: { IdTipoPersona: any; NroDocumento: string; NroDocPerNatural: string; id_aplicacion: number; }) {
    const formData = {...request};
    const url = `${this.baseUrl}/obtenerDatoAplicacionByUsuario`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async buscarPersonaEmpresa(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/BuscarPersonaEmpresa`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async RegistroPersona(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/RegistroPersona`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async RecuperarContrasena(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/RecuperarContrasena`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async CambiarContrasena(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/CambiarContrasena`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async UpdateCorreoTelefonoPersona(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/UpdateCorreoTelefonoPersona`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async Listar_usuarios_representante_legal(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/Listar_usuarios_representante_legal`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async ObtenerPersonaPorRepresentanteLegal(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/ObtenerPersonaPorRepresentanteLegal`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async CambiarEstadoUsuarioPorRepresentanteLegal(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/CambiarEstadoUsuarioPorRepresentanteLegal`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async RegistrarNuevoUsuario(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/RegistrarNuevoUsuario`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async ListAplicacionesByUsuario(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/ListAplicacionesByUsuario`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async obtenerRucDesencriptado(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/obtenerRucDesencriptado`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async obtenerDatosUsuario(request: any) {
    const formData = {...request};
    const url = `${this.baseUrl}/obtenerDatosUsuario`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

  async ObtenerUrlsVolver(request: { TipoBtn: number; }) {
    const formData = {...request};
    const url = `${this.baseUrl}/ObtenerUrlsVolver`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
    }
  }

}
