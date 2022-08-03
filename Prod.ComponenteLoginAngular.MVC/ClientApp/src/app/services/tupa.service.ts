import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { tupaRequest } from '../interfaces/filters/tupaRequest';
import { ServicioTramiteRequest } from '../interfaces/filters/ServicioTramite';

@Injectable({
    providedIn: 'root'
})
export class TupaService {
    baseUrl = `${environment.apiUrl}/Tupa`;
    constructor() { }

    async tupaObtenerPorId(request: tupaRequest) {
        const url = `${this.baseUrl}/Tupa_ObtenerPorId`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async tupaListarPorClaseSector(request: tupaRequest) {
        const url = `${this.baseUrl}/Tupa_ListarPorClaseSector`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async tupaListar(request: tupaRequest) {
        const url = `${this.baseUrl}/Tupa_Listar`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async Servicio_tramite_list_by_dependencia(request: ServicioTramiteRequest) {
        const url = `${this.baseUrl}/Servicio_tramite_list_by_dependencia`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }
}
