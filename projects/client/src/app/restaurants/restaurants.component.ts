import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from '../auth/authentication.service';
import { Venue } from "./restaurants-list/restaurants-list.component";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})

export class RestaurantsComponent implements OnInit {
  cityName: string = "";
  venues: Venue[] = [];
  venues_copy: Venue[] = [];
  url: string = "api/venues/"
  venueFilterText: string | undefined

  constructor(private http: HttpClient, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.route.params.subscribe(
      params => {
        this.cityName = params['cityName']
      }
    )
  }

  filterVenues(venueFilterText: string): void {
    this.venueFilterText = venueFilterText

    if (this.venueFilterText === undefined) {
      return
    }
    this.venues = this.venues_copy.filter((it: any) => {
      return it.name.toLowerCase().includes(this.venueFilterText!.toLowerCase())
    })
  }

  filterList(venues: Venue[]) {
    this.venues = venues
    this.venues_copy = venues
  }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      let headers: HttpHeaders = new HttpHeaders();
      let token = 'token ' + sessionStorage.getItem('token');
      headers = headers.append('Authorization', token);
      
      this.http.get<[]>(this.url, { "params": { "city": this.cityName }, headers: headers }).subscribe(venues => {
        this.venues = venues
        this.venues_copy = venues
      })
    } else {
      this.http.get<[]>(this.url, { "params": { "city": this.cityName } }).subscribe(venues => {
        this.venues = venues
        this.venues_copy = venues
      })
    }
  }
}

