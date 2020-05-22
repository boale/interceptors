import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

  log(message: string): void {
    // tslint:disable-next-line:no-console
    console.log(message)
  }

  error(message: string): void {
    console.error(message);
  }

}
