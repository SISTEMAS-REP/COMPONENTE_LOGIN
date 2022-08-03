import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { comentarioLikeRequest } from '../interfaces/filters/comentarioLikeRequest';

@Injectable({
    providedIn: 'root'
})
export class ComentarioService {
    baseUrl = `${environment.apiUrl}/Comentario`;
    constructor() { }

    async registrarComentarioLikeDislike(request: comentarioLikeRequest) {
        const url = `${this.baseUrl}/RegistrarComentarioLikeDislike`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }

    async listarLikeDislikePorTupa(request: comentarioLikeRequest) {
        const url = `${this.baseUrl}/ListarLikeDislikePorTupa`;
        try {
            const resp = await axios
                .post(url, request);
            return resp.data;
        } catch (err) {
            throw err.data || err;
        }
    }
}
