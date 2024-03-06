import { Delivery } from "./delivery";
import { OrderItem } from "./order-item";
import {Venue} from "./venue";
import {User} from "./user";

export class Order {
    constructor(
      public id: number = 0,
      public deliveryCost : string = "0.0",
      public status: string,
      public venue: Venue,
      public user: User,
      public orderItems: OrderItem[],
      public creationDate: Date,
      public delivery: Delivery,
     ) {};
}
