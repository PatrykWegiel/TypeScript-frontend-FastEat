import {HttpClient, HttpParams} from '@angular/common/http';
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../models/menu';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input()
  menuId: string = ""

  menu: Menu = new Menu();

  @Output()
  productAdded = new EventEmitter()

  constructor(
    private route: ActivatedRoute, private http: HttpClient
  ) { }

  addProductToCart(product: any){
    this.productAdded.emit(product)
  }

  ngOnInit(): void {
    let url = 'api/menu-public/menuId'
    url=url.replace("menuId", this.menuId)
    this.http.get<any>(url).subscribe(menu => {
      this.menu = menu;
    })
  }
}
