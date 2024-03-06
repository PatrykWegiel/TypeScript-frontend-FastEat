import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { RegisterModel } from '../auth/authentication.models';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {
  @ViewChild('f') public form: NgForm | null = null;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.authenticationService.register(new RegisterModel(form.value['login'], form.value['emailAddress'], form.value['password']));
  }

}
