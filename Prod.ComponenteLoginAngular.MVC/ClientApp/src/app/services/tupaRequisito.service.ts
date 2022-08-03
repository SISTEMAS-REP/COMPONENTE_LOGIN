import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { tupaRequisitoRequest } from '../interfaces/filters/tupaRequisitoRequest';

@Injectable({
    providedIn: 'root'
})
export class TupaRequisitoService {
    baseUrl = `${environment.apiUrl}/TupaRequisito`;
    constructor() { }

    async tupaRequisitoListar(request: tupaRequisitoRequest) {
        const url = `${this.baseUrl}/TupaRequisito_Listar`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }
}
