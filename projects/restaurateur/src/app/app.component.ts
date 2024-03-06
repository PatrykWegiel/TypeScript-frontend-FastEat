import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {}

  title = 'restaurateur';
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isAuthenticated = authState.isAuthenticated;
    })
  }
}
