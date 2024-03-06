import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cartItemPost } from '../models/cart-item-post';
import { cartItemPatch } from '../models/cart-item-patch';
import { Cart } from '../models/cart';
import { AuthenticationService } from '../../auth/authentication.service'

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) { 
    }

    getCart(restaurantId: string) {
        let headers: HttpHeaders = new HttpHeaders();
        let token = 'token ' + sessionStorage.getItem('token');
        headers = headers.append('Authorization', token);

        return this.http.get<any>(`api/venues/${restaurantId}/cart`, { headers: headers });
    }

    createCart(cartItems: cartItemPost[], restaurantId: string) {
        let headers: HttpHeaders = new HttpHeaders();
        let token = 'token ' + sessionStorage.getItem('token');
        headers = headers.append('Authorization', token);

        return this.http.post<any>(`api/venues/${restaurantId}/cart`, { items: cartItems }, { headers: headers });
    }

    addItemToCart(cartItem: cartItemPost, restaurantId: string) {
        let headers: HttpHeaders = new HttpHeaders();
        let token = 'token ' + sessionStorage.getItem('token');
        headers = headers.append('Authorization', token);

        console.log(cartItem);

        return this.http.post<any>(`api/venues/${restaurantId}/cart/edit`, cartItem, { headers: headers });
    }

    removeItemFromCart(id: number, restaurantId: string) {
        let headers: HttpHeaders = new HttpHeaders();
        let token = 'token ' + sessionStorage.getItem('token');
        headers = headers.append('Authorization', token);

        return this.http.delete(`api/venues/${restaurantId}/cart/edit/` + id, { headers: headers });
    }

    updateCartItem(id: number, item: cartItemPatch, restaurantId: string) {
        let headers: HttpHeaders = new HttpHeaders();
        let token = 'token ' + sessionStorage.getItem('token');
        headers = headers.append('Authorization', token);

        return this.http.patch(`api/venues/${restaurantId}/cart/edit/` + id, item, { headers: headers });
    }

    deleteCart(restaurantId: string) {
        let headers: HttpHeaders = new HttpHeaders();
        let token = 'token ' + sessionStorage.getItem('token');
        headers = headers.append('Authorization', token);

        return this.http.delete(`api/venues/${restaurantId}/cart`, { headers: headers });
    }
}