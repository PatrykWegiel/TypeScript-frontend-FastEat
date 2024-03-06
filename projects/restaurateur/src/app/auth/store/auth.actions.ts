import { Action } from '@ngrx/store';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';

export const LOGIN_START = 'LOGIN_START';
export const REGISTER_START = 'REGISTER_START';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const LOGOUT = 'LOGOUT';

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: Login) {}
}
export class RegisterStart implements Action {
    readonly type = REGISTER_START;
    constructor(public payload: Register) {}
}
export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: string) {}
}
export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: {[key: string]: string}) {}
}
export class Logout implements Action {
    readonly type = LOGOUT;
}

export type AuthActions = LoginStart | AuthenticateFail | Logout | AuthenticateSuccess | RegisterStart;