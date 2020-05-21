import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  template: `
    <img src="../../assets/digger.gif" />

    <button mat-raised-button color="primary" (click)="requestWithAuth()">Request with auth headers</button>
    <button mat-raised-button color="accent" (click)="requestWithoutAuth()">Request without auth headers</button>
  `,
})
export class AuthComponent {
  response: Observable<any>;

  constructor(private http: HttpClient) {}

  requestWithAuth() {
    const url = 'https://jsonplaceholder.typicode.com/todos/5';
     this.http.get(url).pipe(take(1)).subscribe();
  }

  requestWithoutAuth() {
    const url = 'https://jsonplaceholder.typicode.com/todos/6';
    this.http.get(url).pipe(take(1)).subscribe();
  }
}
