import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.isAuthenticated),
            exhaustMap(isAuthenticated => {
                if (!isAuthenticated) {
                    return next.handle(request);
                }
                let token = sessionStorage.getItem('token');
                
                const modifiedRequest = request.clone({
                    headers: request.headers.append('Authorization', `token ${token}`)
                });
                return next.handle(modifiedRequest);
            })
        )
    }
}