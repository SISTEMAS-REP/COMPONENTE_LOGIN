import { Injectable } from '@angular/core';
import * as qs from 'qs';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { LoginRequest } from '../interfaces/request/login.request';
import { RegisterCompanyRequest } from '../interfaces/request/register-company.request';
import { RegisterPersonRequest } from '../interfaces/request/register-person.request';
import { RecoverPasswordRequest } from '../interfaces/request/recover-password.request';
import { ChangePasswordRequest } from '../interfaces/request/change-password.request';
import { ListApplicationsRequest } from '../interfaces/request/list-applications.request';

@Injectable({
  providedIn: 'root',
})
export class ExtranetService extends ApiService {
  getControllerUrl(): string {
    return 'extranet';
  }

  login = (request: LoginRequest, captcha: string): Observable<any> => {
    var body = qs.stringify(request);
    return this.post('auth', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-captcha-token': captcha,
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

  recoveryPassword = (
    request: RecoverPasswordRequest,
    recaptchaToken: string
  ): Observable<any> => {
    return this.post('PasswordRecovery', request, {
      headers: {
        'x-captcha-token': recaptchaToken,
      },
    });
  };

  changePassword = (
    request: ChangePasswordRequest,
    recaptchaToken: string
  ): Observable<any> => {
    return this.post('PasswordChange', request, {
      headers: {
        'x-captcha-token': recaptchaToken,
      },
    });
  };

  verificarCorreo = (
    request: ChangePasswordRequest
  ): Observable<any> => {
    debugger
    return this.post('CheckMail', request);
  };

  ListApplicationsUser = (
    request: ListApplicationsRequest,     
  ): Observable<any> => {
    debugger
    return this.post('ApplicationsUserList', request);
  };
}
