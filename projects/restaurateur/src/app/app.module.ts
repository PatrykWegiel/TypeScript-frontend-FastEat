import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { MenuModule } from './menu/menu.modules';
import { ConfigurationComponent } from './configuration/configuration.component';

import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeliveryZonesComponent } from './delivery-zones/delivery-zones.component';
import { HeadingComponent } from './common/heading/heading.component';

import * as fromApp from './store/app.reducer'
import { MenuEffects } from './menu/store/menu.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AuthEffects } from './auth/store/auth.effects';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HeadingComponent,
    DashboardComponent,
    DeliveryZonesComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrdersModule,
    AuthModule,
    MenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([MenuEffects, AuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
