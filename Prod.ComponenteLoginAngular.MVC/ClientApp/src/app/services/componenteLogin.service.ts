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
}