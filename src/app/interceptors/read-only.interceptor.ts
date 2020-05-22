import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { LoggerService } from '@app/services/logger.service';
import { SessionService } from '@app/services/session.service';

export function isReadOnlyModeIgnoredForRequest(req: HttpRequest<any>): boolean {
  const isPostGetRequest = req.method === 'POST' && req.url.includes('apiUrlWhereDataIsTakenWithPostRequest');
  const isIgnoredUrl = req.url.includes('https://jsonplaceholder.typicode.com/comments/1');

  return isPostGetRequest || isIgnoredUrl;
}

@Injectable()
export class ReadOnlyInterceptor implements HttpInterceptor {

  constructor(
    private sessionService: SessionService,
    private logger: LoggerService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const readOnly = this.sessionService.readOnly;

    if (!readOnly || isReadOnlyModeIgnoredForRequest(req)) {
      return next.handle(req);
    }

    const message = `Error: cannot ${ req.method } ${ req.url } when read-only!`;
    this.logger.error(message);

    return throwError(new Error(message));
  }
}
