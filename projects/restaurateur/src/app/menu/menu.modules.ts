import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [
    MenuComponent,
    MenuEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class MenuModule { }
