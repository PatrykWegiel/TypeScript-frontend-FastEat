import { CartItem } from "./cart-item";

export class cartItemPatch {
    addons: number[];
    amount: number;
    constructor(cartItem: CartItem){
        this.addons = cartItem.addons.filter(e => e.selected == true).map(e => e.id);
        this.amount = cartItem.amount;
        }
}