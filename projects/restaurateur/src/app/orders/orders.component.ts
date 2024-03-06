import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "./models/order";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  currentOrder: Order | undefined

  private updateSubscription: Subscription | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getOrders()
    this.updateSubscription = interval(3000).subscribe(
      (val) => {
        this.getOrders()
      });

  }

  getOrders(): void {
    this.http.get<Order[]>("api/myorders").subscribe(orders => {
      this.orders = orders;
      if (this.currentOrder && orders.length >= 1) {
        this.currentOrder = orders.filter(o => o.id === this.currentOrder!.id)[0];
      } else if (orders.length >= 1) {
        this.currentOrder = orders[0]
      }

    })
  }

  setCurrentOrder(order: Order) {
    this.currentOrder = order
  }


}
