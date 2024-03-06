import { ActionReducerMap } from '@ngrx/store'

import * as fromMenu from '../menu/store/menu.reducer';
import * as fromAuth from '../auth/store/auth.reducer'

export interface AppState {
    menu: fromMenu.State,
    auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState, any> = {
    menu: fromMenu.menuReducer,
    auth: fromAuth.authReducer
}