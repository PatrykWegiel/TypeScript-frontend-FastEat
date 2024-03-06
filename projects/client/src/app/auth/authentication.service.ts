import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedModel, ChangePasswordModel, LoginModel, RegisterModel } from './authentication.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn: boolean = !!sessionStorage.getItem('token');
  username: string | null = sessionStorage.getItem('username');
  email: string | null = sessionStorage.getItem('email');
  image: string | null = sessionStorage.getItem('image');

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated() {
    return this.loggedIn;
  }

  async login(payload: LoginModel){
     let logged = false
    await this.http.post<AuthenticatedModel>('api/user/login', payload).subscribe(data => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('image', data.image);
        sessionStorage.setItem('email', data.email);
        this.username = data.username;
        this.email = data.email;
        this.loggedIn = true;
        this.image = data.image;
        this.router.navigate([''])
        logged = true
      })

    return logged
  }

  register(payload: RegisterModel) {
    this.http.post('api/user/register', payload).subscribe(data => {
      this.login(new LoginModel(payload.email, payload.password));
    })
  }

  changePassword(payload: ChangePasswordModel) {
    let headers: HttpHeaders = new HttpHeaders();
    let token = 'token ' + sessionStorage.getItem('token');
    headers = headers.append('Authorization', token);

    this.http.patch('api/user/edit/password', payload, {headers: headers} ).subscribe();
  }

  logout () {
    sessionStorage.clear();
    this.username = null;
    this.email = null;
  }

  changeImage(event: any) {
    let headers: HttpHeaders = new HttpHeaders();
    let token = 'token ' + sessionStorage.getItem('token');
    headers = headers.append('Authorization', token)

    const payload = new FormData();
    payload.append("image", event.target.files[0]);

    this.http.patch<{ image: string }>(`api/user/edit/image`, payload, { headers: headers }).subscribe(data => {
      this.image = data.image
      sessionStorage.setItem('image', data.image);
    });
  }
}
