import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('todos/1')) {
      return next.handle(req);
    }

    console.warn('HttpsInterceptor');

    // clone request and replace 'http://' with 'https://' at the same time
    const httpsReq = req.clone({
      url: req.url.replace('http://', 'https://'),
    });

    return next.handle(httpsReq);
  }
}
