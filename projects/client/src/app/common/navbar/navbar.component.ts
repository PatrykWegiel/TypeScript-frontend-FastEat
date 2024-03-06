import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string | null = null;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  getNavbarAuthenticationLink() {
    return this.router.url === '/login' ? '/register' : '/login';
  }

  getNavbarAuthenticationDescription() {
      return this.router.url === '/login' ? 'Sign Up' : 'Login';
  }

  getUserImage(){
    return "api"+ this.authenticationService.image;
  }

  getUsername() {
    this.username = this.authenticationService.username;
    return this.username;
  }

  onLogout() {
    this.authenticationService.logout();
  }



  ngOnInit(): void {
    this.getNavbarAuthenticationLink();
  }

}
