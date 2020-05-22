import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take } from 'rxjs/operators';

// import { paths } from '../const';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  // private domainMatchRegExp: RegExp = /www.mydomain.com\//;
  private token = 'verySecretToken';

  private refreshTokenInProgress = false;
  private refreshToken$$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // if (!req.url.includes(paths.auth)) {
    //   return next.handle(req);
    // }

    console.warn('AuthInterceptor');

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status !== 401) {
          return throwError(error);
        }

        // 401 errors are most likely going to be
        // because we have an expired token that we need to refresh.
        if (this.refreshTokenInProgress) {
          // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
          // which means the new token is ready and we can retry the request again
          return this.refreshToken$$.pipe(
            filter(Boolean),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(req))),
          );
        }

        this.refreshTokenInProgress = true;
        // Set the refreshTokenSubject to null
        // so that subsequent API calls will wait until the new token has been retrieved
        this.refreshToken$$.next(null);

        return this.refreshAccessToken().pipe(
          switchMap((success: boolean) => {
            this.refreshToken$$.next(success);

            return next.handle(this.addAuthenticationToken(req));
          }),
          // When the call to refreshToken completes we reset the refreshTokenInProgress to false
          // for the next time the token needs to be refreshed
          finalize(() => (this.refreshTokenInProgress = false)),
        );
      }),
    );
  }

  private refreshAccessToken(): Observable<boolean> {
    return of('refresh a secret token').pipe(map(() => true));
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // Here we could first retrieve the token from where we store it.
    // If we do not have a token yet then we should not set the header.
    // or
    // If you are calling an outside domain then do not add the token.
    // if (!(this.token && request.url.match(this.domainMatchRegExp))) {
    //   return request;
    // }

    // Check if requested URL needs adding a token
    if (!(this.token && request.url.includes(`https://jsonplaceholder.typicode.com/todos/5`))) {
      return request;
    }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, `Bearer ${ this.token }`),
    });
  }
}
