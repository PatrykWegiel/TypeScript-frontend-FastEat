import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {
  @ViewChild('f') public form: NgForm | null = null;
  public logged: boolean | null = null;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
      this.logged = true
  }
  async onSubmit(form: NgForm) {
    this.logged = await this.authenticationService.login(form.value);
    console.log(this.logged)
  }

}
