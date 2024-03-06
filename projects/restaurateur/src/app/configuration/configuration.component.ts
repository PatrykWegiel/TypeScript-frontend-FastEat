import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import {ActivatedRoute} from "@angular/router";

type kitchenType = {
  id: number,
  kitchenType: string
}

export class Restaurateur {
  constructor(
    public name: string,
    public description: string,
    public street: string,
    public city: string,
    public zipCode: string,
    public phoneNumber: string,
    public deliveryCost: number,
    public deliveryMinimalOrderPrice: number,
    public kitchenType: number[],
    public image: string | null = null
  ) {
  }
}

@Component({
  selector: 'app-orders',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  kitchenTypes: kitchenType[] = [];
  numerOfKitchenTypes = 0
  restaurateurDetails: Restaurateur = new Restaurateur(
    "",
    "",
    "",
    "",
    "",
    "",
    0.00,
    0.0,
    [],
    ""
  )
  chosenKitchenTypes: kitchenType[] = [];
  numDecimalRegex = /^-?\d*[.,]?\d{0,2}$/;
  @ViewChild('fileInput') imageInput: any;

  constructor(private store: Store<fromApp.AppState>, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.http.get<Restaurateur>('api/venues/config').subscribe(restaurateurDetails => {
      this.http.get<kitchenType[]>('api/venues/kitchen/list').subscribe(kitchenTypes => {
        this.kitchenTypes = kitchenTypes
        this.numerOfKitchenTypes = kitchenTypes.length
        this.restaurateurDetails = restaurateurDetails
        this.chosenKitchenTypes = kitchenTypes.filter(kt => restaurateurDetails?.kitchenType.includes(kt.id));
        this.kitchenTypes = this.kitchenTypes.filter(kt => !restaurateurDetails?.kitchenType.includes(kt.id))
      })
    })

    this.form = new FormGroup({
      restaurantName: new FormControl(
        this.restaurateurDetails?.name,
        [
          Validators.required,
          Validators.minLength(4),
        ]
      ),
      restaurantDescription: new FormControl(),
      'kitchenTypes': new FormControl(),
      restaurantStreet: new FormControl(
        this.restaurateurDetails?.street,
        [
          Validators.required,
          Validators.minLength(4),
        ]
      ),
      restaurantCity: new FormControl(
        this.restaurateurDetails?.city,
        [
          Validators.required,
          Validators.minLength(4),
        ]
      ),
      restaurantZipCode: new FormControl(
        this.restaurateurDetails?.street,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("\\d{2}-\\d{3}")
        ]
      ),
      restaurantPhoneNumber: new FormControl(
        this.restaurateurDetails?.phoneNumber,
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
          Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")
        ]
      ),
      deliveryCost: new FormControl(
        this.restaurateurDetails?.phoneNumber,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(this.numDecimalRegex)

        ]
      ),
      deliveryMinimalOrderPrice: new FormControl(
        this.restaurateurDetails?.phoneNumber,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(this.numDecimalRegex)
        ]
      ),
    });
  }

  get restaurantName() {
    return this.form.get('restaurantName');
  }

  get restaurantDescription() {
    return this.form.get('restaurantDescription');
  }

  get restaurantStreet() {
    return this.form.get('restaurantStreet');
  }

  get restaurantZipCode() {
    return this.form.get('restaurantZipCode');
  }

  get restaurantCity() {
    return this.form.get('restaurantCity');
  }

  get restaurantPhoneNumber() {
    return this.form.get('restaurantPhoneNumber');
  }

  get deliveryCost() {
    return this.form.get('deliveryCost');
  }

  get deliveryMinimalOrderPrice() {
    return this.form.get('deliveryMinimalOrderPrice');
  }

  onCorrect() {
    if (this.form.invalid){
      alert("Correct mistakes")
      return
    }
    this.restaurateurDetails.kitchenType = this.chosenKitchenTypes.map(chosenKitchenType => chosenKitchenType.id)
    this.http.patch<Restaurateur>('api/venues/config', this.restaurateurDetails).subscribe(restaurateurDetails => {
      this.http.get<kitchenType[]>('api/venues/kitchen/list').subscribe(kitchenTypes => {
        this.kitchenTypes = kitchenTypes
        this.numerOfKitchenTypes = kitchenTypes.length
        this.restaurateurDetails = restaurateurDetails
        this.chosenKitchenTypes = kitchenTypes.filter(kt => restaurateurDetails?.kitchenType.includes(kt.id));
        this.kitchenTypes = this.kitchenTypes.filter(kt => !restaurateurDetails?.kitchenType.includes(kt.id))
      })
    })
  alert("Corrected saved")
  }

  onRemoveKitchenType(id: number) {
    this.kitchenTypes.push(this.chosenKitchenTypes.filter(kitchenType => kitchenType.id === id)[0])
    this.chosenKitchenTypes = this.chosenKitchenTypes.filter(kitchenType => kitchenType.id !== id);
  }

  onChange() {
    let chosenKitchenType = this.kitchenTypes
      .filter(kitchenType => kitchenType.id === this.form.controls['kitchenTypes'].value)[0];
    this.chosenKitchenTypes.push(chosenKitchenType);
    this.kitchenTypes = this.kitchenTypes.filter(kitchenType => kitchenType.id !== this.form.controls['kitchenTypes'].value);
    this.form.patchValue({'kitchenTypes': null});

  }

  isMaxAmountOfTypesSelected() {
    return this.chosenKitchenTypes.length !== this.numerOfKitchenTypes;
  }

  onImageUpload(event: any) {
    const payload = new FormData();
    payload.append("image", event.target.files[0]);

    this.http.patch<{ image: string }>(`api/venues/config/image`, payload).subscribe(data => {
      if (this.restaurateurDetails)
        this.restaurateurDetails.image = data.image
    });
  }

  onImageDelete() {
    this.imageInput.nativeElement.value = "";
    this.http.patch<{ image: string }>(`api/venues/config/image`, {image: null}).subscribe(data => {
      if (this.restaurateurDetails)
        this.restaurateurDetails.image = data.image
    });
  }
}
