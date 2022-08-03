import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { portalEnlaceRequest } from '../interfaces/filters/portalEnlaceRequest';

@Injectable({
    providedIn: 'root'
})
export class PortalEnlaceService {
    baseUrl = `${environment.apiUrl}/PortalEnlace`;
    constructor() { }

    async portalEnlaceListarPorSeccion(request: portalEnlaceRequest) {
        const url = `${this.baseUrl}/PortalEnlace_ListarPorSeccion`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }
}
