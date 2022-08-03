import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { documentoAdjuntoRequest } from '../interfaces/filters/documentoAdjuntoRequest';

@Injectable({
    providedIn: 'root'
})
export class DocumentoAdjuntoService {
    baseUrl = `${environment.apiUrl}/DocumentoAdjunto`;
    constructor() { }

    async documentoAdjuntoListar(request: documentoAdjuntoRequest) {
        const url = `${this.baseUrl}/DocumentoAdjunto_Listar`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async RegistrarDocumentoAdjunto(request: any) {
        const url = `${this.baseUrl}/RegistrarDocumentoAdjunto`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }
}
