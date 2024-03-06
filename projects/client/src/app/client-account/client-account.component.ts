import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ChangePasswordModel } from '../auth/authentication.models';
import { AuthenticationService } from '../auth/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

class PasswordManager {
  password: string = "";
  newpassword: string = "";
  confirmpassword: string = "";
}

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.scss'],
})

export class ClientAccountComponent implements OnInit {
  passwordManager = new PasswordManager();

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('newpassword');
    let confirmPass = group.get('repeatpassword');
    return pass && confirmPass && pass.value === confirmPass.value ? null : { notSame: true }
  }

  form: FormGroup = new FormGroup({
    password: new FormControl(
      '', [
      Validators.required
    ]
    ),
    newpassword: new FormControl(
      '', [
      Validators.required,
      Validators.minLength(3)
    ]
    ),
    repeatpassword: new FormControl(
      '', [
      Validators.required
    ]
    ),
  }, {
    validators: this.checkPasswords,
    updateOn: 'submit'
  });


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get password() {
    return this.form.get('password');
  }

  get newpassword() {
    return this.form.get('newpassword');
  }

  get repeatpassword() {
    return this.form.get('repeatpassword');
  }

  getUsername() {
    return this.authenticationService.username;
  }

  getEmail() {
    return this.authenticationService.email;
  }

  getUserImage() {
    return "api" + this.authenticationService.image;
  }

  changePassword() {
    if (this.form.value["newpassword"] == "" || this.form.value["password"] == "" || this.form.value["repeatpassword"] == "") {
      return;
    }
    if (this.form.value["newpassword"] == this.form.value["repeatpassword"])
      this.authenticationService.changePassword(new ChangePasswordModel(this.form.value["password"], this.form.value["newpassword"]));
  }

  changeImage(event: any) {
    this.authenticationService.changeImage(event);
  }
}
