import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  get readOnly(): boolean {
    return Math.random() >= 0.5;
  }
}
