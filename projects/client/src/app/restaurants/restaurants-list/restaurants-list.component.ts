import {HttpClient} from '@angular/common/http';
import {Component, Input, OnChanges, OnInit} from '@angular/core';

export class KitchenType {
    constructor(
    public id: number,
    public kitchenType: string,
  ) {
  }
}

export class Venue {
  constructor(
    public id: number,
    public name: string,
    public kitchenType: KitchenType[],
    public description: string,
    public deliveryMinimalOrderPrice: string,
    public deliveryCost: string,
    public avg_rating:number,
    public image: string,
    public menu: string,
    public favorite: boolean
  ) {
  }
}

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})

export class RestaurantsListComponent implements OnInit {
  @Input()
  venues: Venue[] = [];

  constructor() {
  }
  ngOnInit(): void {
  }

}
