import { Injectable } from '@angular/core';
import { ExtranetService } from '../services/extranet.service';
import { catchError, map, mergeMap, Observable } from 'rxjs';
import AppMapping from 'src/app/helpers/app.mapping';
import { LogoRequest } from '../interfaces/request/logo.request';
import { GeneralService } from '../services/general.service';
import { LoginRequest } from '../interfaces/request/login.request';

@Injectable({
  providedIn: 'root',
})
export class LoginRepository {
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

  loginPerson = (
    request: LoginRequest,
    recaptchaToken: string
  ): Observable<void> => {
    return this.extranetService
      .login(request, recaptchaToken)
      .pipe(catchError(this.appMapping.throwError));
  };
}
