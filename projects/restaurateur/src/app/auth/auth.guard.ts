import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromApp.AppState>, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.isAuthenticated),
            map(isAuthenticated => {
                if (isAuthenticated) {
                    console.log("interceptor: isAuthenticated");
                    
                    return true;
                }
                    
                this.router.navigate(['login']);
                return false;
            })
        )}
}