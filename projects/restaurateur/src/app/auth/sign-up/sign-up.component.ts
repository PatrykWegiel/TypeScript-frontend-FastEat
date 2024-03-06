import { HttpClient } from '@angular/common/http';
import { getParseErrors } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { Owner, Register } from '../models/register.model';
import * as AuthActions from '../store/auth.actions';

type kitchenType = {
  id: number,
  kitchenType: string
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});
  kitchenTypes: kitchenType[] = [];
  chosenKitchenTypes: kitchenType[] = [];

  constructor(private store: Store<fromApp.AppState>, private http: HttpClient) { }

  ngOnInit(): void {
    
    this.http.get<kitchenType[]>('api/venues/kitchen/list').subscribe(kitchenTypes => {
      this.kitchenTypes = kitchenTypes
    })

    this.signUpForm = new FormGroup({
      'restaurantName': new FormControl('', [Validators.required]),
      'kitchenTypes': new FormControl(),
      'restaurantStreet': new FormControl('', [Validators.required]),
      'restaurantCity': new FormControl('', [Validators.required]),
      'restaurantZipCode': new FormControl('', [Validators.required, Validators.pattern("\\d{2}-\\d{3}")]),
      'restaurantPhoneNumber': new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12),
        Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")]),
      'ownerEmail': new FormControl('', [Validators.required, Validators.email]),
      'ownerUsername': new FormControl('', [Validators.required]),
      'ownerPassword': new FormControl('', [Validators.required])
    })
  }

  onSignUp() {
    console.log(this.signUpForm);
    
    let signUp = this.signUpForm.controls;
    let chosenKitchenTypesId = this.chosenKitchenTypes.map(chosenKitchenType => chosenKitchenType.id);
    let registerData = new Register(
      new Owner(
        signUp['ownerEmail'].value, 
        signUp['ownerUsername'].value, 
        signUp['ownerPassword'].value
      ),
      signUp['restaurantName'].value, 
      signUp['restaurantStreet'].value, 
      signUp['restaurantCity'].value, 
      signUp['restaurantZipCode'].value, 
      signUp['restaurantPhoneNumber'].value,
      chosenKitchenTypesId
      );

    this.store.dispatch(new AuthActions.RegisterStart(registerData));
  }

  onRemoveKitchenType(id: number) {
    this.kitchenTypes.push(this.chosenKitchenTypes.filter(kitchenType => kitchenType.id === id)[0])
    this.chosenKitchenTypes = this.chosenKitchenTypes.filter(kitchenType => kitchenType.id !== id);
  }

  onChange() {    
    let chosenKitchenType = this.kitchenTypes
    .filter(kitchenType => kitchenType.id === this.signUpForm.controls['kitchenTypes'].value)[0];
    this.chosenKitchenTypes.push(chosenKitchenType);
    this.kitchenTypes = this.kitchenTypes.filter(kitchenType => kitchenType.id !== this.signUpForm.controls['kitchenTypes'].value);
    this.signUpForm.patchValue({'kitchenTypes': null});
  }

  isMaxAmountOfTypesSelected() {
    return this.chosenKitchenTypes.length !== 3;
  }

  get restaurantName() { 
    return this.signUpForm.get('restaurantName');
  }
  get restaurantStreet() { 
    return this.signUpForm.get('restaurantStreet');
  }
  get restaurantCity() { 
    return this.signUpForm.get('restaurantCity');
  }
  get restaurantZipCode() { 
    return this.signUpForm.get('restaurantZipCode');
  }
  get restaurantPhoneNumber() { 
    return this.signUpForm.get('restaurantPhoneNumber');
  }
  get ownerEmail() { 
    return this.signUpForm.get('ownerEmail');
  }
  get ownerUsername() { 
    return this.signUpForm.get('ownerUsername');
  }
  get ownerPassword() { 
    return this.signUpForm.get('ownerPassword');
  }
}

