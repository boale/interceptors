import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotifyInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('posts')) {
      return next.handle(req);
    }

    console.warn('NotifyInterceptor');

    return this.notifyWhenCreated(req, next);
  }

  private notifyWhenCreated(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        const isPostRequest = req.method === 'POST'
        if (!isPostRequest) {
          return;
        }

        const isResponseSuccessful = event instanceof HttpResponse && event.status === 201;
        if (isResponseSuccessful) {
          this.toastr.success('Object created.');
        }
      }),
    );
  }
}
