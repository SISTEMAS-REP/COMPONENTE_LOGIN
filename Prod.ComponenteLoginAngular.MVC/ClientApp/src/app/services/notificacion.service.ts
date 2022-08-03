import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { notificacionRequest } from '../interfaces/filters/notificacionRequest';

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {
    baseUrl = `${environment.apiUrl}/Notificacion`;
    constructor() { }

    async notificacionObtenerPorId(request: notificacionRequest) {
        const url = `${this.baseUrl}/Notificacion_ObtenerPorId`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async notificacionActualizarEstado(request: notificacionRequest) {
        const url = `${this.baseUrl}/Notificacion_ActualizarEstado`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async notificacionListarPorUsuario(request: notificacionRequest) {
        const url = `${this.baseUrl}/Notificacion_ListarPorUsuario`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async notificacionListarDocumentoAdjunto(request: notificacionRequest) {
        const url = `${this.baseUrl}/Notificacion_ListarDocumentoAdjunto`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }
}
