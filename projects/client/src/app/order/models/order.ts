import { Venue } from "../../restaurants/restaurants-list/restaurants-list.component";
import { Delivery } from "./delivery";
import { OrderItem } from "./order-item";

export class Order {
    constructor(
      public id: number = 0,
      public status: string,
      public venue: Venue,
      public orderItems: OrderItem[],
      public creationDate: Date,
      public delivery: Delivery
     ) {};
}