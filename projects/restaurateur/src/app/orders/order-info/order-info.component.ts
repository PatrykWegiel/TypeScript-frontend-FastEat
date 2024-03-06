import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../models/order";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  @Input()
  order: Order | undefined

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getDate() {
    let newDate = new Date(this.order!.creationDate);
    return newDate.toLocaleString()
  }

  getPrice() {
    let price = parseFloat(this.order!.deliveryCost) * 100 | 0
    for (const o of this.order!.orderItems) {
      for(const i of o.addons){
        price += i.price * o.amount
      }
      price += o.item.price * o.amount
    }
    return price
  }

  deny() {
    const url = "api/myorders/" + this.order?.id + "/rejact"
    return this.http.post(url, {}).subscribe(
      d => console.log(d)
    );
  }

  accept() {
    const url = "api/myorders/" + this.order?.id + "/accept"
    console.log(url)
    return this.http.post(url, {}).subscribe(
      d => console.log(d)
    );
  }

  complete() {
    const url = "api/myorders/" + this.order?.id + "/complete";

    return this.http.post(url, {}).subscribe(
      d => console.log(d)
    );
  }

  isOrderNew() {
    return this.order?.status == "new";
  }

  isPending() {
    return this.order?.status == "accepted";
  }

  getAddress() {
    let delivery = this.order?.delivery
    if (delivery == null) {
      return ""
    }
    return delivery.street + " " + delivery?.houseNumber + "/" + delivery?.apartmentNumber

  }
}
