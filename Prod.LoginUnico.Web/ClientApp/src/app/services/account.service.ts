import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ProfileRequest } from '../home/interfaces/request/profile.request';
import { RegisterPersonRequest } from '../auth/interfaces/request/register-person.request';
import { RegisterCompanyRequest } from '../auth/interfaces/request/register-company.request';
import { CompanyUserRequest } from '../home/interfaces/request/company-user.request';
import { ModificationPasswordRequest } from '../home/interfaces/request/Modification-password.request';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends ApiService {
  getControllerUrl(): string {
    return 'account';
  }

  getExtranetAccount = (): Observable<any> => {
    return this.get('extranet', { withCredentiales: true });
  };

  updateExtranetAccount = (request: ProfileRequest): Observable<any> => {
    return this.put('extranet', request, { withCredentiales: true });
  };

  insertExtranetPersonAccount = (
    request: RegisterPersonRequest,
    recaptchaToken: string
  ): Observable<any> => {
    return this.post('extranet/person', request, {
      headers: {
        'x-captcha-token': recaptchaToken,
      },
    });
  };

  insertExtranetCompanyAccount = (
    request: RegisterCompanyRequest,
    recaptchaToken: string
  ): Observable<any> => {
    return this.post('extranet/company', request, {
      headers: {
        'x-captcha-token': recaptchaToken,
      },
    });
  };

  getExtranetCompanyAccountUsers = (): Observable<any> => {
    return this.get('extranet/company/users', { withCredentiales: true });
  };

  updateExtranetCompanyAccountUser = (
    request: CompanyUserRequest
  ): Observable<any> => {
    return this.put(`extranet/company/users/${request.userId}`, request, {
      withCredentiales: true,
    });
  };

  insertExtranetCompanyAccountUser = (
    request: RegisterPersonRequest
  ): Observable<any> => {
    return this.post('extranet/company/users', request, {
      withCredentiales: true,
    });
  };

  applications = (): Observable<any> => {
    return this.get('applications', { withCredentiales: true });
  };

  modificationPassword = (
    request: ModificationPasswordRequest,
    recaptchaToken: string
  ): Observable<any> => {
    return this.post('ModificationPassword', request, {
      headers: {
        'x-captcha-token': recaptchaToken,
      },
    });
  };

  validateCurrentPassword = (
    request: ModificationPasswordRequest,
    recaptchaToken: string
  ): Observable<any> => {
    return this.post('ValidateCurrentPassword', request, {
      headers: {
        'x-captcha-token': recaptchaToken,
      },
    });
  };

}
