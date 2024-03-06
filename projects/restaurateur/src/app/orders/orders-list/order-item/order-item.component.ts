import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../models/order";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input()
  order: Order | undefined

  @Output()
  selectedOrder = new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
  }

  isOrderNew() {
    return this.order?.status == "new";
  }

  isPending() {
    return this.order?.status == "accepted";
  }

  isRejected() {
    return this.order?.status == "rejected";
  }

  getDate() {
    let newDate = new Date(this.order!.creationDate);
    return newDate.toLocaleString()
  }

  getAddress() {
    let delivery = this.order?.delivery
    if (delivery == null) {
      return ""
    }
    return delivery.street + " " + delivery?.houseNumber + "/" + delivery?.apartmentNumber

  }


  isComplete() {
    return this.order?.status == "completed";

  }

}
