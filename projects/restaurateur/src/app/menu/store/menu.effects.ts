import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as PostsActions from './menu.actions';
import { Observable, of } from 'rxjs';

import * as MenuActions from './menu.actions'
import { Menu } from '../models/menu.model';
import { MenuPOST } from '../models/menu-post.model';


@Injectable()
export class MenuEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private sanitizer: DomSanitizer
    ) {}

    getMenu$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MenuActions.GET_MENU),
            switchMap((action: MenuActions.GetMenu) => {

                // // auth
                // let headers: HttpHeaders = new HttpHeaders();
                // let token = 'token 3f892caad9449a4b5158298af64574c3a410cdfa';
                // headers = headers.append('Authorization', token);

                return this.http.get<Menu>('api/menu/')
            }),
            map(menu => {
                console.log(menu)
                return new MenuActions.SetMenu(menu);
            }),
            catchError((error) => {
                return of(new MenuActions.GetMenuFailed(error.error.detail));
            })
        )
    })

    addMenu$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MenuActions.ADD_MENU),
            switchMap((action: MenuActions.AddMenu) => {

                console.log("addMenuEffect");
                

                // // auth
                // let headers: HttpHeaders = new HttpHeaders();
                // let token = 'token 3f892caad9449a4b5158298af64574c3a410cdfa';
                // headers = headers.append('Authorization', token);

                return this.http.post<MenuPOST>('api/menu/', action.payload);
            })
        )
    }, {dispatch: false})

    deleteMenu$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MenuActions.DELETE_MENU),
            switchMap((action: MenuActions.DeleteMenu) => {

                console.log("deleteMenuEffect");
                
                // // auth
                // let headers: HttpHeaders = new HttpHeaders();
                // let token = 'token 3f892caad9449a4b5158298af64574c3a410cdfa';
                // headers = headers.append('Authorization', token);

                return this.http.delete('api/menu/');
            })
        )
    }, {dispatch: false})
}