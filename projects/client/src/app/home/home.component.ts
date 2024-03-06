import {Component, OnInit, Output} from '@angular/core';
import {Venue} from "../restaurants/restaurants-list/restaurants-list.component";
import { StripeScriptTag } from 'stripe-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  cityFilterText: string = ""
  constructor() {
  }

  ngOnInit(): void {

  }

  filterCities(cityFilterText: string): void{
    this.cityFilterText = cityFilterText
  }
}
