import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DeliveryZonesComponent } from "./delivery-zones/delivery-zones.component";
import { MenuComponent } from "./menu/menu.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { OrdersComponent } from "./orders/orders.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { MenuResolverService } from "./menu/menu-resolver.service";

const routes: Routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard]},

    { path: '', component: AuthComponent, children: [
        { path: 'login', component: LoginComponent },
        { path: 'sign-up', component: SignUpComponent }
    ] },

    { path: 'dashboard', redirectTo: '' },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'delivery-zones', component: DeliveryZonesComponent, canActivate: [AuthGuard] },
    { path: 'menu', component: MenuComponent, canActivate: [AuthGuard], /*resolve: [MenuResolverService]*/},
    { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard]},

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
