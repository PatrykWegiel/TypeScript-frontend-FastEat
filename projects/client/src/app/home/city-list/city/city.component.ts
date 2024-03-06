import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
   @Input() name: string = "";

  constructor(private route:ActivatedRoute) {

  }

  ngOnInit(): void {
  }

}
