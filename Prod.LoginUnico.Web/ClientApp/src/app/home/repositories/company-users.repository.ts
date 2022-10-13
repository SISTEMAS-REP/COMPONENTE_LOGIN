import { Injectable } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { catchError, map, Observable, tap } from 'rxjs';
import AppMapping from 'src/app/helpers/app.mapping';
import { CompanyUser } from '../interfaces/company-user';
import { CompanyUserRequest } from '../interfaces/request/company-user.request';
import { RegisterPersonRequest } from 'src/app/auth/interfaces/request/register-person.request';
import { GeneralService } from '../../auth/services/general.service';
import { SunatRequest } from 'src/app/auth/interfaces/request/sunat.request';
import { SunatResponse } from 'src/app/auth/interfaces/response/sunat.response';
import { ReniecResponse } from 'src/app/auth/interfaces/response/reniec.response';
import { ReniecRequest } from 'src/app/auth/interfaces/request/reniec.request';
import { MigracionesRequest } from 'src/app/auth/interfaces/request/migraciones.request';
import { MigracionesResponse } from 'src/app/auth/interfaces/response/migraciones.response';

@Injectable({
  providedIn: 'root',
})
export class CompanyUsersRepository {
  constructor(
    private accountService: AccountService,
    private generalService: GeneralService,
    private appMapping: AppMapping
  ) {}

  findCompanyUsers = (): Observable<CompanyUser[]> => {
    return this.accountService.getExtranetCompanyAccountUsers().pipe(
      tap((response) =>
        console.log('company-user-repository/findCompanyUsers', response)
      ),
      map((response) => response.data as CompanyUser[]),
      catchError(this.appMapping.throwError)
    );
  };

  updateCompanyUser = (request: CompanyUserRequest): Observable<void> => {
    return this.accountService.updateExtranetCompanyAccountUser(request).pipe(
      tap((response) =>
        console.log('company-user-repository/updateCompanyUser', response)
      ),
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

  migraciones = (
    request: MigracionesRequest
  ): Observable<MigracionesResponse> => {
    return this.generalService.migraciones(request).pipe(
      map((response) => response.data as MigracionesResponse),
      catchError(this.appMapping.throwError)
    );
  };

  insertCompanyUser = (request: RegisterPersonRequest): Observable<void> => {
    return this.accountService.insertExtranetCompanyAccountUser(request).pipe(
      tap((response) =>
        console.log('company-user-repository/insertCompanyUser', response)
      ),
      catchError(this.appMapping.throwError)
    );
  };
}
