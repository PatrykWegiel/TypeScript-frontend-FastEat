import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import '@angular/common/locales/global/pl'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input()
  product: any

  @Output()
  productAdded = new EventEmitter()

  constructor() { }

  addProductToCart(product: any) {
    this.productAdded.emit(product)
  }

  getProductAddons(product: any) {
    return product.addons.map((e: any) => { return e.name }).join(", ").toLowerCase();
  }

  ngOnInit(): void {}

}
