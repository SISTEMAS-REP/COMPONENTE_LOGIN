import { Injectable } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { catchError, Observable } from 'rxjs';
import AppMapping from 'src/app/helpers/app.mapping';
import { ListApplicationsRequest } from '../../home/interfaces/request/list-applications.request';

@Injectable({
  providedIn: 'root',
})
export class ListApplicationsRepository {
  constructor(
    private accountService: AccountService,
    private appMapping: AppMapping
  ) {}


  listApplicationsUser = (
    url: ListApplicationsRequest
  ): Observable<void> => {
    return this.accountService
      .ListApplicationsUser(url)
      .pipe(catchError(this.appMapping.throwError));
  };

}
