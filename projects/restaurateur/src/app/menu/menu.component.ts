import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Menu } from './models/menu.model';
import * as fromApp from '../store/app.reducer'
import * as MenuActions from './store/menu.actions'
import { State as MenuState } from './store/menu.reducer';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  menuExist: boolean = false;
  menu: Menu | null = null;
  menuError: string | null = null;
  menuObservable$: Observable<MenuState> = this.store.select('menu');
  menuSubscription: Subscription | null = null;

  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new MenuActions.GetMenu());

     this.menuSubscription = this.menuObservable$.subscribe(menu => {
      this.menuExist = !!menu.menu;
      if(this.menuExist) {
        this.menu = menu.menu;
      } else {
        this.menuError = menu.error;
      }
    })
  }

  onAddNewMenu() {
    this.menuExist = true;
  }

  ngOnDestroy(): void {
    this.menuSubscription?.unsubscribe();
  }

}
