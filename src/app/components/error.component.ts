import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { take } from 'rxjs/operators';

import { paths } from '../const';

@Component({
  template: `
    <button mat-raised-button color="primary" (click)="run()">Run</button>
  `,
})
export class ErrorComponent {
  constructor(private http: HttpClient) {}

  run() {
    this.http.get(paths.error).pipe(take(1)).subscribe();
  }
}
