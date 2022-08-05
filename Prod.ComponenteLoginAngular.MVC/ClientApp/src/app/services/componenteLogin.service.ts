import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComponenteLoginService {
  baseUrl = `${environment.apiUrl}/ComponenteLogin`;
  constructor() { }

  async obtenerImagenByAplicacion(request) {
    const formData = {...request};
    const url = `${this.baseUrl}/Obtener_Imagen_By_Aplicacion`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async IniciarSesionExtranet(request) {
    const formData = {...request};
    const url = `${this.baseUrl}/IniciarSesionExtranet`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async obtenerDatoAplicacionByUsuario(request) {
    const formData = {...request};
    const url = `${this.baseUrl}/obtenerDatoAplicacionByUsuario`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async buscarPersonaEmpresa(request) {
    const formData = {...request};
    const url = `${this.baseUrl}/BuscarPersonaEmpresa`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async RegistroPersona(request) {
    debugger;
    const formData = {...request};
    const url = `${this.baseUrl}/RegistroPersona`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async RecuperarContrasena(request) {
    debugger;
    const formData = {...request};
    const url = `${this.baseUrl}/RecuperarContrasena`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async CambiarContrasena(request) {
    const formData = {...request};
    const url = `${this.baseUrl}/CambiarContrasena`;
    try {
      const resp = await axios
        .post(url, formData);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }
}
