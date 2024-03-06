import { ItemAddon } from "./item-addon";
import { MenuItem } from "./menu-item";

export class OrderItem {
    constructor(
      public item: MenuItem = new MenuItem(),
      public addons: ItemAddon[] = [],
      public amount: number = 1,
      public id: number = 0
      ) { }
}
