import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../models/order";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  @Input()
  orders: Order[] | undefined

  @Output()
  selectedOrder = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  setOrder(order: Order)
  {
    this.selectedOrder.emit(order)

  }
}
