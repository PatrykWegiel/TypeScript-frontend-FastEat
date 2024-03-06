import { CartItem } from "../../menu/models/cart-item";

export class orderItemPost {
    addons: number[];
    item: number;
    amount: number;
    constructor(cartItem: CartItem){
        this.item = cartItem.item.id;
        this.addons = cartItem.addons.filter(e => e.selected == true).map(e => e.id),
        this.amount = cartItem.amount;
        }
}