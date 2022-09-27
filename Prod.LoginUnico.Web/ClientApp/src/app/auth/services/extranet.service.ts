import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { LoginRequest } from '../interfaces/request/login.request';
import { RegisterRequest } from '../interfaces/request/register.request';

@Injectable({
  providedIn: 'root',
})
export class ExtranetService extends ApiService {
  getControllerUrl(): string {
    return 'extranet';
  }

  login = (request: LoginRequest, captcha: string): Observable<any> => {
    return this.post('auth', request, {
      headers: {
        'x-captcha-token': captcha,
      },
    });
  };

  register = (request: RegisterRequest, recaptchaToken: string): Observable<any> => {
    return this.post('register', request, {
      headers: {
        'x-captcha-token': recaptchaToken,
      },
    });
  };

  logout = (refreshToken: string): Observable<any> => {
    return this.post(
      'logout',
      { vcToken: refreshToken },
      { withCredentials: true }
    );
  };
}
