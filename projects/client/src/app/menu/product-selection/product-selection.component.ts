import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss']
})
export class ProductSelectionComponent implements OnInit {
  @Input()
  product: CartItem = new CartItem();
  sum: number = 0;

  @Output()
  onModalClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.summarize();
  }

  countUp(): void {
    this.product.amount += 1;
    this.summarize()
  }
  countDown(): void {
    if (this.product.amount > 0) {
      this.product.amount -= 1;
      this.summarize()
    }
  }

  selectAddon(id: number) {
    const addon = this.product.addons.find(e => e.id == id)
    if (addon) {
      addon.selected = !addon.selected;
      this.summarize();
    }
  }
  
  summarize() {
    this.sum = (this.product.item.price + this.product.addons.filter(item => item.selected == true)
      .reduce((sum, current) => sum + current.price, 0)) * this.product.amount;
  }

  selectProduct() {
    this.onModalClose.emit(this.product)
  }
  closeModal() {
    this.onModalClose.emit();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
      const modal = document.getElementById("modal-background");
      if(event.target == modal) this.closeModal();
  }
}
