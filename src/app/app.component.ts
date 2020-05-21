import { Component, OnInit } from '@angular/core';

import { paths } from './const';

interface TopList {
  path: string;
  position: number;
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  top10: TopList[] = [];
  selected: number;

  ngOnInit(): void {
    const list = Object.keys(paths);
    for (let i = list.length; i > 0; i--) {
      const newItem: TopList = { path: paths[list[i - 1]], position: i };
      this.top10.push(newItem);
    }
  }
}
