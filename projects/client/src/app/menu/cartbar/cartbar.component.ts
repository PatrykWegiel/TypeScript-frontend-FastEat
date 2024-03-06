import { Component, Input, Output, OnInit, HostListener, EventEmitter } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-cartbar',
  templateUrl: './cartbar.component.html',
  styleUrls: ['./cartbar.component.scss']
})
export class CartbarComponent implements OnInit {
  @Input()
  cart: Cart = new Cart();

  @Input()
  restaurantId: string = "";
  
  @Input()
  deliveryCost: number = 0;

  @Output()
  quantityChanged= new EventEmitter();
  
  @Output()
  productRemoved = new EventEmitter();

  constructor() { }

  getProductPrice(product: CartItem){
    return (product.item.price + product.addons.filter(item => item.selected == true).reduce((sum, current) => sum + current.price, 0)) * product.amount
  }

  getProductSelectedAddons(product: CartItem) {
    return product.addons.filter(e => e.selected == true).map((e: any) => { return e.name }).join(", ").toLowerCase();
  }

  removeProductFromCart(id: number){
    this.productRemoved.emit(id)
  }

  changeQuantity(id: number, increase: boolean) {
    let product = this.cart.cartItems.find(c => c.id == id)
    let newCount = 0;
    if (product) {
      newCount = product.amount + (increase ? 1 : -1); 
    }
    this.quantityChanged.emit({id, newCount});
  }

  ngOnInit(): void { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const pageHeight = document.body.scrollHeight;
    const scrollHeight = document.body.clientHeight;
    const number = window.pageYOffset;

    const cartFooter = document.getElementById("cart-footer")
    const cartHeaderY = document.getElementById("cart-header")?.getBoundingClientRect().bottom;
    const pageFooterHeight = document.getElementsByTagName("footer")[0].clientHeight;

    let cartItemList = document.getElementById("cart-item-list");

    if (cartItemList && cartFooter && cartHeaderY) {
      if (pageHeight < number + scrollHeight + pageFooterHeight) {
        const offset = pageHeight - (number + scrollHeight);
        cartFooter.style.bottom = (pageFooterHeight - offset).toString() + "px";
      } else {
        cartFooter.style.bottom = "0";
      }
      cartItemList.style.height = (cartFooter.getBoundingClientRect().top - cartHeaderY).toString() + "px";
    }

  }

}
