import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Venue } from "../restaurants-list/restaurants-list.component";
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.scss']
})
export class InfobarComponent {
  @ViewChild('freeDelivery') freeDelivery: ElementRef | undefined;
  @ViewChild('favorite') favorite: ElementRef | undefined;
  @ViewChild('availability') availability: ElementRef | undefined;
  @ViewChild('rating0') rating0: ElementRef | undefined;
  @ViewChild('rating1') rating1: ElementRef | undefined;
  @ViewChild('rating2') rating2: ElementRef | undefined;
  @ViewChild('rating3') rating3: ElementRef | undefined;
  @ViewChild('rating4') rating4: ElementRef | undefined;

  //sort fields
  @ViewChild('sortByName') sortByName: ElementRef | undefined;
  @ViewChild('sortByRating') sortByRating: ElementRef | undefined;
  @ViewChild('deliveryCost') deliveryCost: ElementRef | undefined;
  @ViewChild('deliveryMinimalOrderPrice') deliveryMinimalOrderPrice: ElementRef | undefined;

  @Input()
  cityName: string = "";

  @Output()
  listFiltered = new EventEmitter()

  url: string = "api/venues/"
  venues: Venue[] = [];

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  private getSortParam(): string {
    if (this.sortByName?.nativeElement.checked) {
      return "name"
    } else if (this.sortByRating?.nativeElement.checked) {
      return "rating"
    }
    if (this.deliveryCost?.nativeElement.checked) {
      return "deliveryCost"
    }
    if (this.deliveryMinimalOrderPrice?.nativeElement.checked) {
      return "deliveryMinimalOrderPrice"
    }
    return ""
  }

  ngOnInit(): void {
  }

  onFilter(): void {
    let params = new HttpParams()
    params = params.append('city', this.cityName)
    let freeDelivery = this.freeDelivery?.nativeElement.checked
    let availability = this.availability?.nativeElement.checked
    let favorite = this.favorite?.nativeElement.checked
    //sorry for that
    let rating = null;
    if (this.rating0?.nativeElement.checked) {
      rating = 5
    } else if (this.rating1?.nativeElement.checked) {
      rating = 4
    } else if (this.rating2?.nativeElement.checked) {
      rating = 3
    } else if (this.rating3?.nativeElement.checked) {
      rating = 2
    } else if (this.rating4?.nativeElement.checked) {
      rating = 1
    }

    let sortParam = this.getSortParam()
    if (sortParam != "")
      params = params.append('sortBy', sortParam)


    if (rating != null) {
      params = params.append('rating', rating.toString())
    }
    if (freeDelivery) {
      params = params.append('freeDelivery', freeDelivery.toString())
    }
    if (availability) {
      params = params.append('availability', "true")
    }
    if (favorite) {
      params = params.append('favorites', "true")
    }
    if (this.authenticationService.isAuthenticated()) {
      let headers: HttpHeaders = new HttpHeaders();
      let token = 'token ' + sessionStorage.getItem('token');
      headers = headers.append('Authorization', token);

      this.http.get<[]>(this.url, { params: params, headers: headers }).subscribe(venues => {
        this.listFiltered.emit(venues)
      })
    } else {
      this.http.get<[]>(this.url, { params: params }).subscribe(venues => {
        this.listFiltered.emit(venues)
      })
    }

  }
}
