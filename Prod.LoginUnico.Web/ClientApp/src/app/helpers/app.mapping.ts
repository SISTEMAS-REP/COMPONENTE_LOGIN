import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { CustomError, CustomErrorType } from '../interfaces/custom-error';
import { UNKNOWN_ERROR } from './app.errors';

@Injectable({
  providedIn: 'root',
})
export default class AppMapping {
  throwError(error: any): Observable<any> {
    if (error instanceof AjaxError) {
      throw {
        errorType: CustomErrorType.error,
        title: error.name,
        status: error.status,
        detail: error.message,
      } as CustomError;
    }
    if (error as CustomError) {
      throw error;
    }
    throw UNKNOWN_ERROR;
  }
}
