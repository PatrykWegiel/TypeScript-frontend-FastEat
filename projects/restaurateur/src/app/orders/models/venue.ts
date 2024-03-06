export class KitchenType {
    constructor(
    public id: number,
    public kitchenType: string,
  ) {
  }
}

export class Venue {
  constructor(
    public id: number,
    public name: string,
    public kitchenType: KitchenType[],
    public description: string,
    public deliveryMinimalOrderPrice: string,
    public deliveryCost: number ,
    public avg_rating:number,
    public image: string,
    public menu: string
  ) {
  }
}
