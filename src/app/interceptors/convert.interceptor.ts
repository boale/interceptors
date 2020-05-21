import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { camelCase, mapKeys } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConvertInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('comments')) {
      return next.handle(req);
    }

    console.warn('ConvertInterceptor');

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const camelCaseObject = mapKeys(event.body, (_, k) => camelCase(k));
          const modEvent = event.clone({ body: camelCaseObject });

          return modEvent;
        }
      }),
    );
  }
}
