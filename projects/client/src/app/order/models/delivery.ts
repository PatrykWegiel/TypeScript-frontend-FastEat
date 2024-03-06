export class Delivery {
    constructor(
      public city: string,
      public street: string,
      public houseNumber: string,
      public apartmentNumber: string,
      public contact_phone: string,
      public information: string,
      public paymentType: string = "card"
     ) {};
}
