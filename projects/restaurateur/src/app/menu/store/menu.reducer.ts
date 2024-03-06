import { Menu } from '../models/menu.model';
import * as MenuActions from './menu.actions';

export interface State {
    menu: Menu | null
    error: string | null
}

const initialState: State = {
    menu: null,
    error: null
}

export function menuReducer(state: State = initialState, action: MenuActions.MenuActions): State {
    switch(action.type) {
        case MenuActions.GET_MENU:                        
            return {
                ...state
            }
        case MenuActions.SET_MENU:
            return {
                ...state,
                menu: action.payload,
                error: null
            }
        case MenuActions.GET_MENU_FAILED:
            return {
                ...state,
                menu: null,
                error: action.payload
            }
        default:
            return state;
    }
}