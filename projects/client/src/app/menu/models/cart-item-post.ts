import { CartItem } from "./cart-item";

export class cartItemPost {
    addons: number[];
    item: number;
    amount: number;
    constructor(cartItem: CartItem){
        this.item = cartItem.item.id;
        this.addons = cartItem.addons.filter(e => e.selected == true).map(e => e.id);
        this.amount = cartItem.amount;
        }
}