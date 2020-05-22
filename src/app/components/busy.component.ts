import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BusyService } from '@app/services/busy.service';

@Component({
  template: '<div *ngIf="busyState$ | async">Spinner...</div>',
})
export class BusyComponent {
  // Spinner in template watches this observable
  busyState$: Observable<{ isBusy: boolean, message: string }>;

  constructor(private busyService: BusyService) {
    this.busyState$ = this.busyService.busyState$;
  }
}
