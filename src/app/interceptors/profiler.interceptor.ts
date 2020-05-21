import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { paths } from '../const';
import { ProfilerService } from '../services/profiler.service';

@Injectable()
export class ProfilerInterceptor implements HttpInterceptor {
  constructor(private profiler: ProfilerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes(paths.profiler) && !req.url.includes('users')) {
      return next.handle(req);
    }

    console.warn('ProfilerInterceptor');

    return this.addRequestProfileLog(req, next);
  }

  private addRequestProfileLog(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    let execStatus: string;

    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            execStatus = 'succeeded';
          }
        },
        // Operation failed; error is an HttpErrorResponse
        _ => (execStatus = 'failed'),
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = ` ${ req.method } "${ req.urlWithParams }" ${ execStatus } in ${ elapsed } ms.`;

        this.profiler.add(msg);
      }),
    );
  }
}
