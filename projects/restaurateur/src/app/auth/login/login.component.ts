import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import { Login } from '../models/login.model';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({
    'email': new FormControl(),
    'password': new FormControl()
  });
  errors: {[key: string]: string} | null = null;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').pipe(
      map(authState => authState.errors)
    ).subscribe(errors => {
      this.errors = errors;
    })
  }

  onSignIn() {
    let signIn = this.signInForm.controls;
    let loginPayload = new Login(
      signIn['email'].value,
      signIn['password'].value
    );
    
    this.store.dispatch(new AuthActions.LoginStart(loginPayload));
  }

  errorKeyExist(errorKeys: string[]) {
    if (this.errors)
      return Object.keys(this.errors).some(key => {
        return errorKeys.includes(key);
      });
    return false;
  }

  getErrorKey(errorKey: string) {
    if(this.errors)
      return this.errors[errorKey];
    return '';
  }
}
