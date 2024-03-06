import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { Login, User } from "../models/login.model";
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((action: AuthActions.LoginStart) => {
                return this.http.post<User>('api/user/login', action.payload).pipe(
                    map((user) => {
                        sessionStorage.setItem('token', user.token);
                        sessionStorage.setItem('username', user.username);
                        return new AuthActions.AuthenticateSuccess(user.username);
                    }),
                    tap(() => {
                        this.router.navigate(['']);
                    }),
                    catchError((error: {error: { [key: string]: string[]}}) => {
                                            
                        let Error: {[key: string]: string} = {};
                        Object.keys(error.error).forEach(key => {
                            Error[key] = error.error[key][0];
                        });
                        
                        return of(new AuthActions.AuthenticateFail(Error));
                    })
                )
            })
        )
    })

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.REGISTER_START),
            switchMap((action: AuthActions.RegisterStart) => {
                return this.http.post<User>('api/venues/register', action.payload).pipe(
                    map(() => {
                        let loginPayload = new Login(
                            action.payload.owner.email,
                            action.payload.owner.password
                            );

                        return new AuthActions.LoginStart(loginPayload);
                    }),
                    catchError((error: {error: { [key: string]: string[]}}) => {
                                            
                        let Error: {[key: string]: string} = {};
                        Object.keys(error.error).forEach(key => {
                            Error[key] = error.error[key][0];
                        });
                        
                        return of(new AuthActions.AuthenticateFail(Error));
                    })
                )
            })
        )
    })



//     logout$ = createEffect(() => {
//         return this.actions$.pipe(
//             ofType(AuthActions.LOGOUT),
//             map(() => {
//                 return new AuthActions.SetFlash('You are now signed out');
//             }),
//             tap(() => {
//                 sessionStorage.removeItem('userData');
//                 this.router.navigate(['']);
//             })
//         )
//     })

    
//     validateInput$ = createEffect(() => {
//         const seed = 0;
//         return this.actions$.pipe(
//             ofType(AuthActions.VALIDATE_INPUT),
//             groupBy((action: AuthActions.ValidateInput) => action.payload[0].name),
//             map(group => group.pipe(
//                 switchMap((action: AuthActions.ValidateInput) => {
//                     return this.http.post('api/users/validate', action.payload).pipe(
//                         map(validationResult => {
//                             return validationResult === true ? (
//                                 this.store.dispatch(new AuthActions.InputValidationResult({name: action.payload[0].name, state: 3}))
//                             ) : (
//                                 this.store.dispatch(new AuthActions.InputValidationResult({name: action.payload[0].name, state: 0, error: validationResult[0]}))
//                             );
//                         })
//                     )
//                 })
//             )),
//             mergeAll()
//         )
//     }, {dispatch: false})

// }

// const handleError = (errorRes: any) => {
//     let errorMessage = 'An unknown error occurred!';
    
//     if (!errorRes.error) {
//       return of(new AuthActions.AuthenticateFail(errorMessage));
//     }
//     switch (errorRes.error.message) {
//       case 'EMAIL_EXISTS':
//         errorMessage = 'This email exists already';
//         break;
//       case 'USERNAME_NOT_FOUND':
//         errorMessage = 'This username does not exist.';
//         break;
//       case 'INVALID_PASSWORD':
//         errorMessage = 'This password is not correct.';
//         break;
//     }
//     return of(new AuthActions.AuthenticateFail(errorMessage));
//   };
}