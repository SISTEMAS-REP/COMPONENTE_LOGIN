import { Injectable } from '@angular/core';
import { ExtranetService } from '../services/extranet.service';
import { catchError, Observable } from 'rxjs';
import AppMapping from 'src/app/helpers/app.mapping';
import { ListApplicationsRequest } from '../interfaces/request/list-applications.request';

@Injectable({
  providedIn: 'root',
})
export class ListApplicationsRepository {
  constructor(
    private extranetService: ExtranetService,
    private appMapping: AppMapping
  ) {}


  listApplicationsUser = (
    url: ListApplicationsRequest
  ): Observable<void> => {
    return this.extranetService
      .ListApplicationsUser(url)
      .pipe(catchError(this.appMapping.throwError));
  };

}
