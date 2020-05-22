import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

const notBusy = { isBusy: false, message: null };

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  private busyCounter = 0;

  private busyState$$ = new BehaviorSubject<any>(notBusy);
  busyState$ = this.busyState$$.asObservable();

  increment(message?: string): void {
    this.busyCounter++;
    this.busyState$$.next({ isBusy: true, message });
  }

  decrement(): void {
    if (this.busyCounter > 0) {
      this.busyCounter--;

      return;
    }

    this.busyState$$.next(notBusy);
  }
}
