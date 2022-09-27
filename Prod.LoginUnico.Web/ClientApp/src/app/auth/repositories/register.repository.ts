import { Injectable } from '@angular/core';
import { ExtranetService } from '../services/extranet.service';
import { catchError, map, mergeMap, Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/request/register.request';
import AppMapping from 'src/app/helpers/app.mapping';
import { LogoRequest } from '../interfaces/request/logo.request';
import { GeneralService } from '../services/general.service';
import { SunatRequest } from '../interfaces/request/sunat.request';
import { ReniecRequest } from '../interfaces/request/reniec.request';
import { SunatResponse } from '../interfaces/response/sunat.response';
import { ReniecResponse } from '../interfaces/response/reniec.response';

@Injectable({
  providedIn: 'root',
})
export class RegisterRepository {
  constructor(
    private generalService: GeneralService,
    private extranetService: ExtranetService,
    private appMapping: AppMapping
  ) {}

  logo = (request?: LogoRequest): Observable<any> => {
    return this.generalService.logo(request).pipe(
      map((response) => response.data),
      catchError(this.appMapping.throwError)
    );
  };

  sunat = (request: SunatRequest): Observable<SunatResponse> => {
    return this.generalService.sunat(request).pipe(
      map((response) => response.data as SunatResponse),
      catchError(this.appMapping.throwError)
    );
  };

  reniec = (request: ReniecRequest): Observable<ReniecResponse> => {
    return this.generalService.reniec(request).pipe(
      map((response) => response.data as ReniecResponse),
      catchError(this.appMapping.throwError)
    );
  };

  registerPerson = (
    request: RegisterRequest,
    recaptchaToken: string
  ): Observable<void> => {
    return this.extranetService
      .register(request, recaptchaToken)
      .pipe(catchError(this.appMapping.throwError));
  };

  registerCompany = (
    request: RegisterRequest,
    recaptchaToken: string
  ): Observable<void> => {
    return this.extranetService
      .register(request, recaptchaToken)
      .pipe(catchError(this.appMapping.throwError));
  };
}
