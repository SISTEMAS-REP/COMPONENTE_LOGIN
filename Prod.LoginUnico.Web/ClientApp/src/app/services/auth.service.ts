import { Injectable } from '@angular/core';
import { catchError, map, of, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  getControllerUrl(): string {
    return 'auth';
  }

  isLoggedIn(): Observable<boolean> {
    return this.get('check').pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
