import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { LogoRequest } from '../interfaces/request/logo.request';
import { SunatRequest } from '../interfaces/request/sunat.request';
import { ReniecRequest } from '../interfaces/request/reniec.request';

@Injectable({
  providedIn: 'root',
})
export class GeneralService extends ApiService {
  getControllerUrl(): string {
    return 'general';
  }

  logo = (request?: LogoRequest): Observable<any> => {
    return this.get('logo', {
      params: request ? this.setParams(request) : {},
    });
  };

  sunat = (request: SunatRequest): Observable<any> => {
    return this.post('sunat', request);
  };

  reniec = (request: ReniecRequest): Observable<any> => {
    return this.post('reniec', request);
  };
}
