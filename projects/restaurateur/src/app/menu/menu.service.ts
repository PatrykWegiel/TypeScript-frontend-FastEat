import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from './models/menu.model';

@Injectable()
export class MenuService {
  constructor(private http: HttpClient) { }

    getMenu() {
        let headers: HttpHeaders = new HttpHeaders();
        let token = 'token 4f985dd1880b3f8a94a5f12c417220dda8f2d676';
        headers = headers.append('Authorization', token);

        return this.http.get<Menu>('api/menu/', {headers: headers})
    }


}
