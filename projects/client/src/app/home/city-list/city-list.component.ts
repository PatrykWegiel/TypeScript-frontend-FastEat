import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit, OnChanges {
  @Input()
  cityFilterText: string | undefined

  cities: { ['name']: string }[] = []
  cities_copy: { ['name']: string }[] = []

  constructor(private http: HttpClient) {
    console.log(this.cityFilterText)
  }

  ngOnInit(): void {
    this.http.get<{ ['name']: string }[]>('api/cities/').subscribe(cities => {
      this.cities = cities;
      this.cities_copy = cities;
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.cityFilterText===undefined){
      return
    }
    this.cities = this.cities_copy.filter((it:any)=>{ return it.name.toLowerCase().includes(this.cityFilterText!.toLowerCase())})
  }
}
