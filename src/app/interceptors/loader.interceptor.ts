import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private loader: LoaderService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('albums')) {
      return next.handle(req);
    }

    console.warn('LoaderInterceptor');

    this.loader.show();

    return next.handle(req).pipe(
      delay(1000),
      finalize(() => this.loader.hide()),
    );
  }
}
