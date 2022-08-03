import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { personaRequest } from '../interfaces/filters/personaRequest';
@Injectable({
    providedIn: 'root'
})
export class AdministrarUsuarioService {
    baseUrl = `${environment.apiUrl}/AdministrarUsuario`;
    constructor() { }

      async Listar_usuarios_representante_legal() {
        const url = `${this.baseUrl}/Listar_usuarios_representante_legal`;
        try {
          const resp = await axios
            .post(url);
          return resp.data;
        } catch (err) {
          throw err.data || err;
        }
      }

      async ObtenerPersonaPorRepresentanteLegal(data: any) {
        const request = { ...data };
        const url = `${this.baseUrl}/ObtenerPersonaPorRepresentanteLegal`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
      }

      async CambiarEstadoUsuarioPorRepresentanteLegal(data: any) {
        const request = { ...data };
        const url = `${this.baseUrl}/CambiarEstadoUsuarioPorRepresentanteLegal`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
      }

      async RegistrarNuevoUsuario(request: personaRequest) {
        const url = `${this.baseUrl}/RegistrarNuevoUsuario`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
      }
}
