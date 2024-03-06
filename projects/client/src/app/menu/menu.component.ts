import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Cart } from './models/cart';
import { CartItem } from './models/cart-item';
import { AuthenticationService } from '../auth/authentication.service'
import { CartService } from './cartbar/cart.service';
import { cartItemPost } from './models/cart-item-post';
import { MenuItem } from './models/menu-item';
import { ItemAddon } from './models/item-addon';
import { cartItemPatch } from './models/cart-item-patch';
import { Venue } from '../restaurants/restaurants-list/restaurants-list.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  restaurantId: string = "";
  restaurant: Venue | any;
  cart: Cart = new Cart();
  selectedProduct: CartItem | undefined;

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, private cartService: CartService, private http: HttpClient) {
    this.route.params.subscribe(
      params => {
        this.restaurantId = params['restaurantId']
      }
    )
  }

  ngOnInit(): void {
    if (this.restaurantId) {
      this.http.get<any>("api/venues/" + this.restaurantId).subscribe(restaurant => {
        this.restaurant = restaurant;
      })
    }
    if (this.authenticationService.isAuthenticated()) {
      this.cartService.getCart(this.restaurantId).subscribe(cart => {
        this.parseCart(cart);
        console.log(cart);
      });
    } else {
      const cartJson = sessionStorage.getItem("cart" + this.restaurantId);
      if (cartJson) {
        this.cart = JSON.parse(cartJson);
        this.summarize();
      }
    }
  }

  parseCart(cart: any) {
    this.cart = cart;
    this.cart.cartItems.forEach(e => {
      e.addons.forEach(a => {
        a.selected = true;
      })
    })
    this.summarize();
    sessionStorage.setItem("cart" + this.restaurantId, JSON.stringify(this.cart));
  }

  summarize() {
    let sum = 0;
    this.cart.cartItems.forEach(e => {
      sum += (e.item.price + e.addons.filter(item => item.selected == true).reduce((sum, current) => sum + current.price, 0)) * e.amount
    })
    this.cart.sum = sum;
  }

  equals = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

  async addProductToCart(product: CartItem) {
    console.log(product);
    if (product) {
      const cartItem = this.cart.cartItems.find(e => e.item.id == product.item.id &&
        this.equals(product.addons.filter(e => e.selected == true).map(e => e.id), e.addons.filter(e => e.selected).map(c => c.id)));
      if (cartItem) {
        if (this.authenticationService.isAuthenticated()) {
          cartItem.amount += product.amount;
          this.cartService.updateCartItem(cartItem.id, new cartItemPatch(cartItem), this.restaurantId).subscribe(cart => this.parseCart(cart));
        }
      } else {
        if (this.authenticationService.isAuthenticated()) {
          if (this.cart.cartItems.length == 0) {
            this.cartService.createCart([new cartItemPost(product)], this.restaurantId).subscribe(cart => this.parseCart(cart));
          } else {
            this.cartService.addItemToCart(new cartItemPost(product), this.restaurantId).subscribe(cart => this.parseCart(cart));
          }
        } else {
          this.cart.cartItems.push(product);
        }

      }
      this.summarize();
      sessionStorage.setItem("cart" + this.restaurantId, JSON.stringify(this.cart));
    }
    this.selectedProduct = undefined;
  }

  selectProduct(product: any) {
    this.selectedProduct = new CartItem(new MenuItem(product.id, product.name, product.price),
      product.addons.flat().map((p: any) => Object.assign(new ItemAddon, p)));
  }

  removeProductFromCart(id: number) {
    let itemId = this.cart.cartItems.findIndex(c => c.id == id);
    if (itemId > -1) {
      if (this.authenticationService.isAuthenticated()) {
        this.cartService.removeItemFromCart(this.cart.cartItems[itemId].id, this.restaurantId).subscribe();
      }
      this.cart.cartItems.splice(itemId, 1);
      this.summarize();
      sessionStorage.setItem("cart" + this.restaurantId, JSON.stringify(this.cart));
    }
  }

  changeCartItemQuantity(event: { id: number, newCount: number }) {
    let itemId = this.cart.cartItems.findIndex(c => c.id == event.id);
    if (itemId > -1) {
      if (event.newCount == 0) {
        if (this.authenticationService.isAuthenticated()) {
          this.cartService.removeItemFromCart(this.cart.cartItems[itemId].id, this.restaurantId).subscribe();
        }
        this.cart.cartItems.splice(itemId, 1);
      } else {
        this.cart.cartItems[itemId].amount = event.newCount;
        this.cartService.updateCartItem(this.cart.cartItems[itemId].id, new cartItemPatch(this.cart.cartItems[itemId]), this.restaurantId).subscribe();
      }
      this.summarize();
    }
    sessionStorage.setItem("cart" + this.restaurantId, JSON.stringify(this.cart));
  }
}
