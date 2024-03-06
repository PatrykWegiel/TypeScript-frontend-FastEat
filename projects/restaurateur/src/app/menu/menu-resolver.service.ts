import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, switchMap, take } from "rxjs/operators";
import { Actions, ofType } from "@ngrx/effects";

import * as fromApp from '../store/app.reducer';
import * as MenuActions from './store/menu.actions';
import { Menu } from "./models/menu.model";

@Injectable({ providedIn: 'root' })
export class MenuResolverService implements Resolve<Menu> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('menu').pipe(
      take(1),  //!!!
      map(menuState => {
        return menuState.menu;
      }),
      switchMap(posts => {
          this.store.dispatch(new MenuActions.GetMenu());
          return this.actions$.pipe(
            ofType(MenuActions.SET_MENU),
            take(1)
          );
      })
    );
  }
}