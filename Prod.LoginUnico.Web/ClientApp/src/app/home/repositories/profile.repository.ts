import { Injectable } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { catchError, map, Observable, tap } from 'rxjs';
import AppMapping from 'src/app/helpers/app.mapping';
import { ProfileResponse } from '../interfaces/response/profile.response';
import { ProfileRequest } from '../interfaces/request/profile.request';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository {
  constructor(
    private accountService: AccountService,
    private appMapping: AppMapping
  ) {}

  findProfile = (): Observable<ProfileResponse> => {
    return this.accountService.getExtranetAccount().pipe(
      tap((response) => console.log('profile-repository/findProfile', response)),
      map((response) => response.data as ProfileResponse),
      catchError(this.appMapping.throwError)
    );
  };

  updateProfile = (request: ProfileRequest): Observable<void> => {
    return this.accountService.updateExtranetAccount(request).pipe(
      tap((response) =>
        console.log('profile-repository/updateProfile', response)
      ),
      catchError(this.appMapping.throwError)
    );
  };
}
