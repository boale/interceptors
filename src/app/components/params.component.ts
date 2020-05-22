import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { take } from 'rxjs/operators';

@Component({
  template: `
    <button mat-raised-button color="primary" (click)="run()">Run</button>
  `,
})
export class ParamsComponent {
  constructor(private http: HttpClient) {}

  run() {
    this.http.get('https://jsonplaceholder.typicode.com/comments/1').pipe(take(1)).subscribe();
  }
}
