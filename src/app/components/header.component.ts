import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { paths } from '../const';

@Component({
  template: `
    <button mat-raised-button color="primary" (click)="run()">Run</button>
  `,
})
export class HeaderComponent {
  constructor(private http: HttpClient) {}

  run() {
    this.http.get(paths.header).subscribe();
  }
}
