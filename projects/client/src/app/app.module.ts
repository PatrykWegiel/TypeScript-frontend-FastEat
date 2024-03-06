import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './common/navbar/navbar.component';
import {InfobarComponent} from './restaurants/infobar/infobar.component';
import {RestaurantsListComponent} from './restaurants/restaurants-list/restaurants-list.component';
import {RestaurantComponent} from './restaurants/restaurants-list/restaurant/restaurant.component';
import {CityListComponent} from './home/city-list/city-list.component';
import {CityComponent} from "./home/city-list/city/city.component";
import {MenuComponent} from './menu/menu.component';
import {CartComponent} from './cart/cart.component';
import {CartbarComponent} from './menu/cartbar/cartbar.component';
import {CategoriesComponent} from './menu/categories/categories.component';
import {ProductsComponent} from './menu/categories/products/products.component';
import {ClientLoginComponent} from './client-login/client-login.component';
import {HttpClientModule} from '@angular/common/http';
import {SearchbarComponent} from './common/searchbar/searchbar.component';
import {ProductSelectionComponent} from './menu/product-selection/product-selection.component';
import {RestaurantsComponent} from "./restaurants/restaurants.component";
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientAccountComponent } from './client-account/client-account.component';
import { OrderComponent } from './order/order.component';
import { StripeModule } from 'stripe-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CityListComponent,
    CityComponent,
    MenuComponent,
    RestaurantsComponent,
    InfobarComponent,
    RestaurantsListComponent,
    RestaurantComponent,
    CartComponent,
    CartbarComponent,
    ProductsComponent,
    CategoriesComponent,
    ClientLoginComponent,
    SearchbarComponent,
    ProductSelectionComponent,
    ClientRegisterComponent,
    ClientAccountComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StripeModule.forRoot("") ,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[]
})
export class AppModule {
}
