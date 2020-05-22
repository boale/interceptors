import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BusyService } from '@app/services/busy.service';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {

  constructor(
    private busyService: BusyService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const message = req.method === 'GET' ? 'Loading...' : 'Saving...';
    this.busyService.increment(message);

    return next.handle(req).pipe(
      finalize(() => this.busyService.decrement()),
    );
  }

}
