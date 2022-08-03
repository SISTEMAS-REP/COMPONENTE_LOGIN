import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { documentoRequest } from '../interfaces/filters/flujoRequest';
import { solicitudRequest } from '../interfaces/filters/solicitudRequest';
import { solicitudEnvioRequest } from '../interfaces/filters/solicitudRequest';
import { tupaRequest } from '../interfaces/filters/tupaRequest';

@Injectable({
    providedIn: 'root'
})
export class SolicitudService {
    baseUrl = `${environment.apiUrl}/Solicitud`;
    constructor() { }

    async solicitudListar(request: solicitudRequest) {
        const url = `${this.baseUrl}/Solicitud_Listar`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async detalleFlujoDocumentarioListar(request: documentoRequest) {
        const url = `${this.baseUrl}/DetalleFlujoDocumentario_Listar`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async subirArchivoPrincipal(file: any) {
        const formData = new FormData();
        for (const prop in file) {
          if (!file.hasOwnProperty(prop)) { continue; }
          formData.append(prop , file[prop]);
        }
        const url = `${this.baseUrl}/GuardarArchivoPrincipal`;
        try {
            const resp = await axios
                .post(url, formData);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async subirArchivo(file: any) {
        const formData = new FormData();
        for (const prop in file) {
          if (!file.hasOwnProperty(prop)) { continue; }
          formData.append(prop , file[prop]);
        }
        const url = `${this.baseUrl}/GuardarArchivo`;
        try {
            const resp = await axios
                .post(url, formData);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async solicitudEnviar(request: solicitudEnvioRequest) {
        const url = `${this.baseUrl}/EnviarSolicitud`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async solicitudTupaEnviar(request: solicitudEnvioRequest) {
        const url = `${this.baseUrl}/EnviarSolicitudTupa`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }
}
