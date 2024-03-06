import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderItemComponent } from './orders-list/order-item/order-item.component';
import { OrderInfoComponent } from './order-info/order-info.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrdersListComponent,
    OrderItemComponent,
    OrderInfoComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: []
})
export class OrdersModule { }
