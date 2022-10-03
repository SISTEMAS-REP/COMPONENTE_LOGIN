import { Injectable } from '@angular/core';
import { ExtranetService } from '../services/extranet.service';
import { catchError, map, mergeMap, Observable } from 'rxjs';
import AppMapping from 'src/app/helpers/app.mapping';
import { LogoRequest } from '../interfaces/request/logo.request';
import { GeneralService } from '../services/general.service';
import { ChangePasswordRequest } from '../interfaces/request/change-password.request';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordRepository {
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

  changePasswordPerson = (
    request: ChangePasswordRequest,
    recaptchaToken: string
  ): Observable<void> => {
    return this.extranetService
      .changePassword(request, recaptchaToken)
      .pipe(catchError(this.appMapping.throwError));
  };

  changePasswordCompany = (
    request: ChangePasswordRequest,
    recaptchaToken: string
  ): Observable<void> => {
    return this.extranetService
      .changePassword(request, recaptchaToken)
      .pipe(catchError(this.appMapping.throwError));
  };




}
