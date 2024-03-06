import { CartItem } from "./cart-item";

export class menuCategory {
    constructor(
      public id: number = 0,
      public name: string = "",
      public description: string = "",
      public items: CartItem[] = [],
      public sequence: number = 1,
     ) {};
}