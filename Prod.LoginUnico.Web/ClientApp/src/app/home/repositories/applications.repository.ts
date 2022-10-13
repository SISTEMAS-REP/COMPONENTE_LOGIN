import { Injectable } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { catchError, map, Observable, tap } from 'rxjs';
import AppMapping from 'src/app/helpers/app.mapping';
import { ApplicationResponse } from '../interfaces/response/application.response';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsRepository {
  constructor(
    private accountService: AccountService,
    private appMapping: AppMapping
  ) {}

  applications = (): Observable<ApplicationResponse[]> => {
    return this.accountService.applications().pipe(
      tap((response) =>
        console.log('applications-repository/applications', response)
      ),
      map((response) => response.data as ApplicationResponse[]),
      catchError(this.appMapping.throwError)
    );
  };
}
