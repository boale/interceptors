import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  readOnly = Math.random() >= 0.5;
}
