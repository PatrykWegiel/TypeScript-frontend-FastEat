import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Cart} from '../menu/models/cart';
import {CartItem} from '../menu/models/cart-item';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Venue} from '../restaurants/restaurants-list/restaurants-list.component';
import {OrderPost} from '../order/models/order-post';
import {Delivery} from '../order/models/delivery';
import {orderItemPost} from '../order/models/order-item-post';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  form:FormGroup = new FormGroup({
    firstName: new FormControl(
      Validators.required
    ),
    lastName: new FormControl(
      Validators.required
    ),
    emailAddress:new FormControl(
      Validators.required,
      Validators.email
    ),
    phoneNumber:new FormControl(
      Validators.required,
      Validators.pattern('^[0-9.]+$')
    ),
    city:new FormControl(
      Validators.required
    ),
    cityCode:new FormControl(
      Validators.required
    ),
    street: new FormControl(
      Validators.required
    ),
    apartamentNumber:new FormControl(
      Validators.required
    ),
    homeNumber:new FormControl(
      Validators.required
    )
  })
  cart: Cart = new Cart();
  restaurantId: string = "";
  restaurant: Venue | any;
  firstName: string = "";
  lastName: string = "";
  emailAddress: string = "";
  phoneNumber: string = "";
  city: string = "";
  cityCode: string = "";
  street: string = "";
  apartmentNumber: string = "";
  houseNumber: string = "";
  information: string = "";
  contactPhone: string = "";
  submitted = false;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(
      params => {
        this.restaurantId = params['restaurantId']
      }
    )

  }
static isNumbers(control: AbstractControl) {

    if (!(control.value)) {
      return null;
    }

    return String(control.value)
      .match(/^[0-9.]+$/) ? null : {'isNumbers': true};
  }
  getProductPrice(product: CartItem) {
    return (product.item.price + product.addons.filter(item => item.selected == true).reduce((sum, current) => sum + current.price, 0)) * product.amount
  }

  getProductSelectedAddons(product: CartItem) {
    return product.addons.filter(e => e.selected == true).map((e: any) => {
      return e.name
    }).join(", ").toLowerCase();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngOnInit(): void {

    this.invokeStripe();
    if (this.restaurantId) {
      this.http.get<any>("api/venues/" + this.restaurantId).subscribe(restaurant => {
        this.restaurant = restaurant;
      })
    }
    const cartJson = sessionStorage.getItem("cart" + this.restaurantId);
    if (cartJson) {
      this.cart = JSON.parse(cartJson);
    }
  }

  submitOrder = (stripeToken: {type: string}) => {
    console.log(stripeToken)

    var order = new OrderPost(
      this.restaurantId,
      this.cart.cartItems.map(e => new orderItemPost(e)),
        new Delivery(
        this.city,
        this.street,
        this.houseNumber,
        this.apartmentNumber,
        this.contactPhone,
        this.information,
        stripeToken.type,
      )
    )
    let headers: HttpHeaders = new HttpHeaders();
    let token = 'token ' + sessionStorage.getItem('token');
    headers = headers.append('Authorization', token);

    this.http.post<any>('api/orders', order, {headers: headers}).subscribe();

    window.location.href = "/orders"
  }

  paymentHandler: any = null;
  onSubmit(amount:any){
    this.submitted=true;
    //hack
    let token =  sessionStorage.getItem('token');
    if(token==undefined){
      alert("Zaloguj się aby móc złożyc zamówienie")
      return
    }
    var cartform = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    cartform.classList.add('was-validated');
    if(this.form.valid){
      this.makePayment(amount)

    }

  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L0BzTE2MlOvV0VtMCi4CRxrFG1BBOHbPhSyH7fgd91PTmLFBEwSO80uFnd2MG49RUV8H6Ihcq0F8P08hlbg0ppD00MymXx9ld',
      locale: 'auto',
      token: this.submitOrder
    });

    paymentHandler.open({
      name: 'Fast Eat',
      description: 'Płatność',
      amount: amount * 100,
      currency: "PLN"
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');

      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L0BzTE2MlOvV0VtMCi4CRxrFG1BBOHbPhSyH7fgd91PTmLFBEwSO80uFnd2MG49RUV8H6Ihcq0F8P08hlbg0ppD00MymXx9ld',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
