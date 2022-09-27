import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {
  //@Inject('BASE_URL')
  private readonly baseUrl?: string = 'api';

  private readonly controllerUrl = this.getControllerUrl();

  constructor(protected httpClient: HttpClient) {}

  abstract getControllerUrl(): string;

  private isAbsoluteUrl = (url: string): boolean => {
    const path = /^https?:\/\//i;
    return path.test(url);
  };

  private getUrl = (url: string) => {
    if (this.isAbsoluteUrl(url)) {
      return url;
    }
    return `${this.baseUrl}/${this.controllerUrl}/${url}`;
  };

  getJSON = <T>(url: string): Observable<T> => {
    return this.httpClient.get<T>(url);
  };

  getBlob = <T>(url: string, options?: {}): Observable<T> => {
    return this.httpClient.get<T>(this.getUrl(url), options);
  };

  get = <T>(url: string, options?: {}): Observable<ApiResponse<T>> => {
    return this.httpClient.get<ApiResponse<T>>(this.getUrl(url), options);
  };

  post = <T>(
    url: string,
    body: any,
    options?: {}
  ): Observable<ApiResponse<T>> => {
    return this.httpClient.post<ApiResponse<T>>(
      this.getUrl(url),
      body,
      options
    );
  };

  upload = (url: string, body: any, options?: {}): Observable<any> => {
    return this.httpClient.post(this.getUrl(url), body, options);
  };

  put = <T>(
    url: string,
    body: any,
    options?: {}
  ): Observable<ApiResponse<T>> => {
    return this.httpClient.put<ApiResponse<T>>(this.getUrl(url), body, options);
  };

  delete = <T>(url: string, options?: {}): Observable<ApiResponse<T>> => {
    return this.httpClient.delete<ApiResponse<T>>(this.getUrl(url), options);
  };

  setParams = <T>(request: T): any => {
    return (Object.keys(request) as (keyof typeof request)[]).reduce(
      (queryParams: any, key: keyof T) => {
        // getting value from map
        let value: any = request[key];
        // extracting value if it's an array
        value = Array.isArray(value) ? value[0] : value;
        // adding only defined values to the params
        if (value !== undefined && value !== null) {
          queryParams[key] = value;
        }
        return queryParams;
      },
      {}
    );
  };
}
