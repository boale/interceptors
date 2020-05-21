import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { paths } from '../const';

@Component({
  template: `
    <h3>Response</h3>
    <pre>{{ response | async | json }}</pre>
    <button mat-raised-button color="primary" (click)="run()">Run</button>
  `,
})
export class FakeComponent {
  response: Observable<any>;
  constructor(private http: HttpClient) {}

  run() {
    this.response = this.http.get(paths.fake);
  }
}
