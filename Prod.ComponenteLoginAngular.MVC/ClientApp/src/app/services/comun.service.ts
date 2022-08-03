import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { reniecFilter } from '../interfaces/filters/reniecFilter';
import { personaRequest } from '../interfaces/filters/personaRequest';
import { busquedaRequest } from '../interfaces/filters/busquedaRequest';
import { usuarioDomicilioModel } from '../interfaces/models/solicitudModel';

@Injectable({
    providedIn: 'root'
})
export class ComunService {
    baseUrl = `${environment.apiUrl}/Comun`;
    constructor() { }

    async buscarPersonaEmpresa(request: personaRequest) {
        const url = `${this.baseUrl}/BuscarPersonaEmpresa`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async registrarPersona(request: personaRequest) {
        const url = `${this.baseUrl}/RegistrarModificarPersonaEmpresa`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async obtenerDatosUsuario () {
        const url = `${this.baseUrl}/ObtenerDatosUsuario`;
        try {
            const resp = await axios
                .post(url, null);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async obtenerDepartamentos () {
        const url = `${this.baseUrl}/getDepartamentos`;
        try {
            const resp = await axios
                .get(url, null);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async ObtenerSistemas(request: personaRequest) {
        const url = `${this.baseUrl}/ObtenerSistemasData`;
        try {
          const resp = await axios
            .post(url,request);
          return resp.data;
        } catch (err) {
          throw err.data || err;
        }
      }


    async busquedaGeneralListar(request: busquedaRequest) {
        const url = `${this.baseUrl}/BusquedaGeneral_Listar`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async ObtenerDependenciasPrincipales () {
        const url = `${this.baseUrl}/ObtenerDependenciasPrincipales`;
        try {
            const resp = await axios
                .get(url, null);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async obtenerDependencias(data: any) {
        const request = { ...data };
        const url = `${this.baseUrl}/ObtenerDependencias`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async obtenerDependencia(data: any) {
        const request = { ...data };
        const url = `${this.baseUrl}/ObtenerDependenciaPorId`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async obtenerDependenciaPorDefecto() {
        const url = `${this.baseUrl}/ObtenerDependenciaPorDefecto`;
        try {
            const resp = await axios
                .get(url);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async obtenerClaseDocumento(data: any) {
        const request = { ...data };
        const url = `${this.baseUrl}/ObtenerClaseDocumento`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }


    async p_Obtener_Datos_Aplicacion_By_Usuario(data: personaRequest) {
        const request = { ...data };
        const url = `${this.baseUrl}/p_Obtener_Datos_Aplicacion_By_Usuario`;
        try {
          const resp = await axios
            .post(url,request);
          return resp.data;
        } catch (err) {
          throw err.data || err;
        }
    }
    
    async GetInformacionPersona() {
        const url = `${this.baseUrl}/GetInformacionPersona`;
        try {
            const resp = await axios
            .post(url);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async GuardarConsentimiento(data: any) {
        const request = { ...data };
        const url = `${this.baseUrl}/GuardarConsentimiento`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async ObtenerDatosUsuarioDomicilio() {
        const url = `${this.baseUrl}/ObtenerDatosUsuarioDomicilio`;
        try {
            const resp = await axios
            .post(url);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async ActivarCasilla() {
        const url = `${this.baseUrl}/ActivarCasilla`;
        try {
            const resp = await axios
            .post(url);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async DesactivarCasilla(data: any) {
        const request = { ...data };
        const url = `${this.baseUrl}/DesactivarCasilla`;
        try {
            const resp = await axios
            .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async SumarClickConsultasLinea(data: any) {
        const request = { ...data };
        const url = `${this.baseUrl}/SumarClickConsultasLinea`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }
}
