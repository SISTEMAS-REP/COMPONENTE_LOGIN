import { Injectable } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { catchError, map, mergeMap, Observable } from 'rxjs';
import AppMapping from 'src/app/helpers/app.mapping';
import { LogoRequest } from '../interfaces/request/logo.request';
import { GeneralService } from '../../auth/services/general.service';
import { ModificationPasswordRequest } from '../interfaces/request/Modification-password.request';

@Injectable({
  providedIn: 'root',
})
export class ModificationPasswordRepository {
  constructor(
    private generalService: GeneralService,
    private accountService: AccountService,
    private appMapping: AppMapping
  ) {}

  logo = (request?: LogoRequest): Observable<any> => {
    return this.generalService.logo(request).pipe(
      map((response) => response.data),
      catchError(this.appMapping.throwError)
    );
  };

  changePasswordPerson = (
    request: ModificationPasswordRequest,
    recaptchaToken: string
  ): Observable<void> => {
    return this.accountService
      .modificationPassword(request, recaptchaToken)
      .pipe(catchError(this.appMapping.throwError));
  };

  changePasswordCompany = (
    request: ModificationPasswordRequest,
    recaptchaToken: string
  ): Observable<void> => {
    return this.accountService
      .modificationPassword(request, recaptchaToken)
      .pipe(catchError(this.appMapping.throwError));
  };

}
