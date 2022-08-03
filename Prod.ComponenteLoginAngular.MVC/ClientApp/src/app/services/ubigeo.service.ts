import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { reniecFilter } from '../interfaces/filters/reniecFilter';

@Injectable({
    providedIn: 'root'
})
export class UbigeoService {
    baseUrl = `${environment.apiUrl}/Ubigeo`;
    constructor() { }

    ObtenerUbigeo = async () => {
        const url = `${this.baseUrl}/ObtenerUbigeo`;
        try {
            const resp = await axios
                .get(url, null);
            return resp.data;
        } catch (err) {
            return [];
        }
    }

    ObtenerDepartamentos = async (codigoDepartamento?: any) => {
        const url = `${this.baseUrl}/ObtenerDepartamentos`;
        const request = { params: { Value: codigoDepartamento ? null : codigoDepartamento } };
        try {
            const resp = await axios
                .get(url, request);
            return resp.data;
        } catch (err) {
            return [];
        }
    }

    ObtenerProvincias = async (codigoDepartamento: any) => {
        const url = `${this.baseUrl}/ObtenerProvincias`;
        const request = { params: { Value: codigoDepartamento } };
        try {
            const resp = await axios
                .get(url, request);
            return resp.data;
        } catch (err) {
            return [];
        }
    }

    ObtenerDistritos = async (codigoProvincia) => {
        const url = `${this.baseUrl}/ObtenerDistritos`;
        const request = { params: { Value: codigoProvincia } };
        try {
            const resp = await axios
                .get(url, request);
            return resp.data;
        } catch (err) {
            return [];
        }
    }
}
