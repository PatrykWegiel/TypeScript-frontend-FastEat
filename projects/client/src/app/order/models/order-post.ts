import { Delivery } from "./delivery";
import { orderItemPost } from "./order-item-post";

export class OrderPost {
    constructor(
      public venue: string,
      public orderItems: orderItemPost[],
      public delivery: Delivery
     ) {};
}