import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { encryptedData, ParseResponse } from './http-helpers';
// import { ParseResponse, encryptedData } from '@app/helpers/http-helpers';


@Injectable({ providedIn: 'root' })
export class HttpClientInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                    if (typeof event.body.DataModel !== 'undefined') {
                        if (encryptedData) {
                            event = event.clone({ body: ParseResponse(event.body) })
                        }
                    }
                }
                return event;
            }));
    }
}