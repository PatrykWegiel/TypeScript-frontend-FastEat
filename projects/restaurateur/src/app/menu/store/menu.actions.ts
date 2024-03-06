import { Action } from "@ngrx/store";
import { MenuPOST } from "../models/menu-post.model";
import { Menu } from "../models/menu.model";


export const GET_MENU = "GET_MENU";
export const GET_MENU_FAILED = "GET_MENU_FAILED"
export const SET_MENU = "SET_MENU";
export const ADD_MENU = "ADD_MENU";
export const DELETE_MENU = "DELETE_MENU";


export class GetMenu implements Action {
    readonly type = GET_MENU
}

export class SetMenu implements Action {
    readonly type = SET_MENU;
    constructor(public payload: Menu) {}
}

export class GetMenuFailed implements Action {
    readonly type = GET_MENU_FAILED;
    constructor(public payload: string) {}
}

export class AddMenu implements Action {
    readonly type = ADD_MENU;
    constructor(public payload: MenuPOST) {}
}

export class DeleteMenu implements Action {
    readonly type = DELETE_MENU
}


export type MenuActions = SetMenu | GetMenu | GetMenuFailed | AddMenu | DeleteMenu;