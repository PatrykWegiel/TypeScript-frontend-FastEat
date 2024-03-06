import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './models/order';
import { Delivery } from './models/delivery';
import { OrderItem } from './models/order-item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  status: { [id: string]: string } = {
    new: "nowe",
    accepted: "zaakceptowane",
    rejected: "odrzucone",
    completed: "ukończone"
  }

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  ngOnInit(): void {
    let headers: HttpHeaders = new HttpHeaders();
    let token = 'token ' + sessionStorage.getItem('token');
    headers = headers.append('Authorization', token);

    this.http.get<Order[]>("api/orders", { headers: headers }).subscribe(orders => {
      this.orders = orders;
    })
  }

  getDetailId(id: number) {
    return `detail${id}`
  }
  getHeaderId(id: number) {
    return `header${id}`
  }
  addHash(id: string) {
    return `#${id}`
  }

  orderPrice(order: Order) {
    let sum = parseFloat(order.venue.deliveryCost) * 10
    order.orderItems.forEach(e => {
      sum += (e.item.price + e.addons.reduce((sum: any, current: { price: any; }) => sum + current.price, 0)) * e.amount
    })
    return sum;
  }

  capitalizeFirstLetter(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  getProductPriceWithAddons(orderItem: OrderItem) {
    return orderItem.item.price + orderItem.addons.reduce((sum: any, current: { price: any; }) => sum + current.price, 0);
  }

  getProductAddons(orderItem: OrderItem) {
    return orderItem.addons.map((e: { name: any; }) => e.name).join(", ").toLowerCase();
  }

  getDeliveryAddress(delivery: Delivery) {
    return `${this.capitalizeFirstLetter(delivery.city)}, ${this.capitalizeFirstLetter(delivery.street)} ${delivery.houseNumber}` + (delivery.apartmentNumber != null ? "/" + delivery.apartmentNumber : "");
  }
}
