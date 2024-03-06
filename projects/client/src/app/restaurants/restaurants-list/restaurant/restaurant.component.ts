import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { Venue } from "../restaurants-list.component";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  @Input()
  venue: Venue | any
  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  onFavoriteClick(venue: Venue) {
    let headers: HttpHeaders = new HttpHeaders();
    let token = 'token ' + sessionStorage.getItem('token');
    headers = headers.append('Authorization', token);

    if (venue.favorite) {
      this.http.delete(`api/venues/favorites/${venue.id}`, { headers: headers }).subscribe(venues => {
        venue.favorite = false;
      })
    } else {
      this.http.post(`api/venues/favorites/${venue.id}`, {}, { headers: headers }).subscribe(venues => {
        venue.favorite = true;
      })
    }

  }

  ngOnInit(): void {
  }

}
