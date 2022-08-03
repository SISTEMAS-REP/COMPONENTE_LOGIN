import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { reniecFilter } from '../interfaces/filters/reniecFilter';
import { personaRequest } from '../interfaces/filters/personaRequest';
import { loginRequest } from '../interfaces/filters/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = `${environment.apiUrl}/Seguridad`;
  // baseUrlPV = `${environment.apiWebPV}/ExtranetToken`;
  constructor() { }

  async IniciarSesionExtranet(request: loginRequest) {
    const url = `${this.baseUrl}/IniciarSesionExtranet`;
    try {
      const resp = await axios
        .post(url, request);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async PreparaQS(request: loginRequest) {
    const url = `${this.baseUrl}/PreparaQS`;
    try {
      const resp = await axios
        .post(url, request);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async IniciarSesionIntranet(request: loginRequest) {
    const url = `${this.baseUrl}/IniciarSesionIntranet`;
    try {
      const resp = await axios
        .post(url, request);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async RecuperarContrasena(request: loginRequest) {
    const url = `${this.baseUrl}/RecuperarContrasena`;
    try {
      const resp = await axios
        .post(url, request);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  async CambiarContrasena(request: loginRequest) {
    const url = `${this.baseUrl}/CambiarContrasena`;
    try {
      const resp = await axios
        .post(url, request);
      return resp.data;
    } catch (err) {
      throw err.data || err;
    }
  }

  // async LogoutExtranet() {
  //     const url = `${this.baseUrlPV}/ExternalLogOut`;
  //     try {
  //         const resp = await axios
  //             .get(url, null);
  //         return resp.data;
  //     } catch (err) {
  //         throw err.data || err;
  //     }
  // }
}
