import axios from 'axios';
import { DEFAULT_INTERNAL_ERROR, encryptedData, ParseResponse } from './http-helpers';
// import { ParseResponse, encryptedData, DEFAULT_INTERNAL_ERROR } from '@app/helpers/http-helpers';

export const RegisterInterceptors = () => {

    axios.interceptors.request.use(
        (config) => {

            if (!config.headers) {
                config.headers = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': '*'
                };
            } else {
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                config.headers['Access-Control-Allow-Origin'] = '*';
            }

            return config;
        },
        (error) =>{
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(

        (response) => {
            if (typeof response.data.DataModel === 'undefined') {
                return response;
            }
            if (encryptedData) {
                response.data = ParseResponse(response.data);
            }
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                window.location.reload();
            }
            if (encryptedData) { error.response.data = ParseResponse(error.response.data); }
            else {
                if (!error.response.data) {
                    throw DEFAULT_INTERNAL_ERROR;
                }
            }
            return Promise.reject(error.response);
        }
    );
};
