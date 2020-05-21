import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfilerService {
  add(log: string) {
    // tslint:disable-next-line:no-console
    console.info(log);
  }
}
