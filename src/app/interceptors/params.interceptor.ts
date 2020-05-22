import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { paths } from '../const';

@Injectable()
export class ParamsInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes(paths.header)) {
      return next.handle(req);
    }

    console.warn('ParamsInterceptor');

    const modified = req.clone({ setParams: { page: '0', offset: '100', custom: 'true' } });

    return next.handle(modified);
  }
}
