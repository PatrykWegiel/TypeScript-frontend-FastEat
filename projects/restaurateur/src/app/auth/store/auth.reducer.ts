import * as AuthActions from './auth.actions';

export interface State {
    username: string | null,
    isAuthenticated: boolean,
    errors: {[key: string]: string} | null
}

const initialState: State = {
    username: sessionStorage.getItem('username'),
    isAuthenticated: !!sessionStorage.getItem('token'),
    errors: null
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                username: action.payload,
                isAuthenticated: true
            }
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                errors: action.payload
            }
        case AuthActions.LOGOUT:
            sessionStorage.clear();
            return {
                ...state,
                username: null,
                isAuthenticated: false
            }

        default:
            return state;
    }
}