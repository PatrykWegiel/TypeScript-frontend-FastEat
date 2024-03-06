import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { CartComponent } from "./cart/cart.component";
import { ClientRegisterComponent } from "./client-register/client-register.component";
import { ClientLoginComponent } from "./client-login/client-login.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { ClientAccountComponent } from "./client-account/client-account.component";
import { OrderComponent } from "./order/order.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'account', pathMatch: 'full', component: ClientAccountComponent },
  { path: 'orders', pathMatch: 'full', component: OrderComponent },
  { path: 'restaurants/:cityName', pathMatch: 'full', component: RestaurantsComponent },
  { path: 'menu/:restaurantId', pathMatch: 'full', component: MenuComponent },
  { path: 'cart/:restaurantId', pathMatch: 'full', component: CartComponent },
  { path: 'register', pathMatch: 'full', component: ClientRegisterComponent },
  { path: 'login', pathMatch: 'full', component: ClientLoginComponent },
  { path: 'home', pathMatch: 'full', component: ClientLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
