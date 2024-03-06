import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CategoryPOST } from '../models/category-post.model';
import { Category } from '../models/category.model';
import { ItemPOST } from '../models/item-post.model';
import { MenuPOST } from '../models/menu-post.model';
import { Menu } from '../models/menu.model';

import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import * as MenuActions from '../store/menu.actions'
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { AddonPOST } from '../models/addon-post.model';

const MENU_DELETE = -1;
const MENU_NONE = 0;
const MENU_NEW = 1;
const MENU_ACTIVE = 2;
const MENU_MODIFYIED = 3;

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})

export class MenuEditComponent implements OnInit {

  @Input() menu: Menu | null = null;
  newMenu: Menu | null = null;
  menuState = MENU_NONE;

  menuForm: FormGroup = new FormGroup({});
  formGroupData: { [key: string]: AbstractControl } = {};

  categories: Category[] = [];

  checkPrice: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value.toString();
    const isNum = value.match(/^-?\d*[.,]?\d{0,2}$/)

    return value != "" && (isNum == null || Number.isNaN(value) || parseInt(value) < 0) ? { invalidPrice: true } : null
  }


  constructor(private store: Store<fromApp.AppState>, private http: HttpClient) { }

  ngOnInit(): void {
    this.menuState = this.hasActiveMenu() ? MENU_ACTIVE : MENU_NEW;
    if (this.menu !== null && this.menu.categories) {
      this.categories = this.menu?.categories
    }
    this.initMenuForm();
  }

  initMenuForm() {
    // GENERAL
    let menuName = "";
    let menuDescription = "";

    if (this.menu !== null) {
      menuName = this.menu.name;
      menuDescription = this.menu.description;
    }

    this.formGroupData['menuName'] = new FormControl(menuName);
    this.formGroupData['menuDescription'] = new FormControl(menuDescription);

    // CATEGORIES
    if (this.menu !== null && this.menu.categories !== null && !!this.menu.categories.length) {
      this.menu.categories.forEach((category) => {
        this.formGroupData[this.getCategoryNameId(category.id)] = new FormControl(category.name);
        this.formGroupData[this.getCategoryDescriptionId(category.id)] = new FormControl(category.description);
        // PRODUCTS
        category.items.forEach(item => {
          this.formGroupData[this.getProductNameId(category.id, item.id)] = new FormControl(item.name);
          this.formGroupData[this.getProductPriceId(category.id, item.id)] = new FormControl(item.price / 100, [this.checkPrice]);
          item.addons.forEach(addon => {
            this.formGroupData[this.getAddonNameId(category.id, item.id, addon.id)] = new FormControl(addon.name);
            this.formGroupData[this.getAddonPriceId(category.id, item.id, addon.id)] = new FormControl(addon.price / 100, [this.checkPrice]);
          })
        })
      })
    }
    this.menuForm = new FormGroup(this.formGroupData)
    // console.log(this.formGroupData)
    // console.log(this.menuForm);
  }

  onAddCategory() {
    if (this.menuState === MENU_NEW) {

      this.categories.push({
        'id': this.getNextCategoryId(),
        'name': '',
        'items': [],
      });

      const newCategory = this.getLastCategory();
      this.formGroupData[this.getCategoryNameId(newCategory.id)] = new FormControl(newCategory.name);
      this.formGroupData[this.getCategoryDescriptionId(newCategory.id)] = new FormControl(newCategory.description);

      this.menuForm = new FormGroup(this.formGroupData)
    }
  }

  onAddProduct(categoryId: number) {

    if (this.menuState === MENU_NEW) {
      const category = this.getCategory(categoryId);

      category.items.push({
        'id': this.getNextProductId(categoryId),
        'name': '',
        'price': 0,
        'addons': []
      });

      const newProduct = this.getLastProduct(categoryId);

      this.formGroupData[this.getProductNameId(categoryId, newProduct.id)] = new FormControl(newProduct.name);
      this.formGroupData[this.getProductPriceId(categoryId, newProduct.id)] = new FormControl(newProduct.price * 100, [this.checkPrice]);

      this.menuForm = new FormGroup(this.formGroupData)
    }

  }

  onAddAddon(categoryId: number, product: Item) {

    if (this.menuState === MENU_NEW) {

      product.addons.push({
        'id': this.getNextAddonId(product),
        'name': '',
        'price': 0,
      });

      const newAddon = this.getLastAddon(product);

      this.formGroupData[this.getAddonNameId(categoryId, product.id, newAddon.id)] = new FormControl(newAddon.name);
      this.formGroupData[this.getAddonPriceId(categoryId, product.id, newAddon.id)] = new FormControl(newAddon.price * 100, [this.checkPrice]);

      this.menuForm = new FormGroup(this.formGroupData, {})
    }

  }

  getFormControl(id: string) {
    return this.menuForm.get(id);
  }

  onAddMenu() {
    const formControls = this.menuForm.controls;
    const inputNames = Object.keys(formControls);

    let menuName = formControls['menuName'].value;
    let menuDescription = formControls['menuDescription'].value;
    const withoutMenuInputs = inputNames.filter(key => key.match('^c.*$'));

    const categoriesInputs = withoutMenuInputs.filter(key => !key.match('_p.*$'))

    const amountOfCategories = categoriesInputs.length / 2;

    let categories: CategoryPOST[] = [];

    for (let c = 1; c <= amountOfCategories; c++) {
      let categoryInputs = categoriesInputs.filter(key => key.match(`^c${c}.*$`))

      let categoryData = categoryInputs.filter(data => !data.match(`^c${c}_p.*$`));

      let category: {
        'name': string,
        'description': string,
        'items': ItemPOST[]
      } = {
        'name': formControls[categoryData[0]].value,
        'description': formControls[categoryData[1]].value,
        'items': []
      }

      let productsInputs = withoutMenuInputs.filter(data => data.match(`c${c}_p[0-9]+_[a-z][^0-9]`))

      const amountOfProducts = productsInputs.length / 2;

      for (let p = 1; p <= amountOfProducts; p++) {
        let productData = productsInputs.filter(key => key.match(`p${p}_[a-z][^0-9]`));

        let itemPOST = new ItemPOST(formControls[productData[0]].value, formControls[productData[1]].value * 100, []);

        let addonsInput = withoutMenuInputs.filter(data => data.match(`^c${c}_p${p}_a[0-9]+`))

        for (let a = 0; a < addonsInput.length; a += 2) {
          itemPOST.addons.push(new AddonPOST(formControls[addonsInput[a]].value , formControls[addonsInput[a + 1]].value * 100))
        }

        category.items.push(itemPOST);
      }
      let categoryPOST = new CategoryPOST(
        category.name,
        category.items,
        category.description
      )
      categories.push(categoryPOST);
    }

    let menuPOST = new MenuPOST(
      menuName,
      menuDescription,
      categories
    )
    console.log(menuPOST);
    this.store.dispatch(new MenuActions.AddMenu(menuPOST));
  }

  onDeleteMenu() {
    this.store.dispatch(new MenuActions.DeleteMenu());
  }

  onProductImageChange(event: any, product: Item, categoryId: number) {
    const element = (<HTMLImageElement>document.getElementById(`${this.getProductImageId(categoryId, product.id)}_image`))
    if (this.menuState == MENU_ACTIVE) {
      const payload = new FormData();
      payload.append("image", event.target.files[0]);
      this.http.patch<{ image: string }>(`api/items/${product.id}/image`, payload).subscribe(data => {
        element.src = 'api' + data.image;
      });
    }
  }

  getAccordionHeading(productName: string) {
    return productName === "" ? "Name" : productName;
  }

  getAccordionAddonHeading(addonName: string) {
    return addonName === "" ? "Addon" : addonName;
  }

  private getNextCategoryId() {
    if (this.categories.length) {
      const ids = this.categories.map(category => {
        return category.id;
      });
      return Math.max(...ids) + 1;
    } else {
      return 1;
    }

  }

  private getNextProductId(categoryId: number) {
    const items = this.getCategory(categoryId).items;
    if (items.length) {
      const ids = items.map(item => {
        return item.id;
      });
      return Math.max(...ids) + 1;
    } else {
      return 1;
    }
  }

  private getNextAddonId(product: Item) {
    const addons = product.addons;
    if (addons.length) {
      const ids = addons.map(addon => {
        return addon.id;
      });
      return Math.max(...ids) + 1;
    }
    return 1;
  }

  private getCategory(id: number) {
    return this.categories.filter(category => category.id === id)[0];
  }

  private getLastCategory() {
    return this.categories[this.categories.length - 1];
  }
  private getLastProduct(categoryId: number) {
    const items = this.getCategory(categoryId).items;
    return items[items.length - 1];
  }
  private getLastAddon(product: Item) {
    const addons = product.addons;
    return addons[addons.length - 1];
  }
  hasCategories() {
    return !!this.categories.length;
  }

  private hasActiveMenu() {
    return !!this.menu;
  }

  // Generate unique category data id
  getCategoryNameId(categoryId: number) {
    return `c${categoryId}_name`
  }
  getCategoryDescriptionId(categoryId: number) {
    return `c${categoryId}_description`
  }
  getCategoryProductsId(categoryId: number) {
    return `c${categoryId}_products`
  }
  getCategoryProductsIdWithHash(categoryId: number) {
    return `#c${categoryId}_products`
  }

  // generate unique product data id
  getProductNameId(categoryId: number, productId: number) {
    return `c${categoryId}_p${productId}_name`
  }
  getProductPriceId(categoryId: number, productId: number) {
    return `c${categoryId}_p${productId}_price`
  }
  getProductImageId(categoryId: number, productId: number) {
    return `c${categoryId}_p${productId}_image`
  }
  getProductAddonsId(productId: number) {
    return `c${productId}_addons`
  }
  getProductAddonsIdWithHash(productId: number) {
    return `#c${productId}_addons`
  }
  // generate unique addon data id
  getAddonNameId(categoryId: number, productId: number, addonId: number) {
    return `c${categoryId}_p${productId}_a${addonId}_name`
  }
  getAddonPriceId(categoryId: number, productId: number, addonId: number) {
    return `c${categoryId}_p${productId}_a${addonId}_price`
  }

  getAddonModalId(productId: number) {
    return `p${productId}_modal`
  }

  getAddonModalIdWithHash(productId: number) {
    return `#p${productId}_modal`
  }

  getUniqueProductId(categoryId: number, productId: number) {
    return `c${categoryId}_p${productId}`;
  }

  getUniqueAddonId(categoryId: number, productId: number, addonId: number) {
    return `c${categoryId}_p${productId}_a${addonId}`;
  }

  getUniqueHeadingId(categoryId: number, productId: number) {
    return `heading_${this.getUniqueProductId(categoryId, productId)}`
  }
  getUniqueContentId(categoryId: number, productId: number) {
    return `content_${this.getUniqueProductId(categoryId, productId)}`
  }
  getUniqueHeadingIdWithHash(categoryId: number, productId: number) {
    return `#heading_${this.getUniqueProductId(categoryId, productId)}`
  }
  getUniqueContentIdWithHash(categoryId: number, productId: number) {
    return `#content_${this.getUniqueProductId(categoryId, productId)}`
  }

  getUniqueAddonHeadingId(categoryId: number, productId: number, addonId: number) {
    return `heading_${this.getUniqueAddonId(categoryId, productId, addonId)}`
  }
  getUniqueAddonContentId(categoryId: number, productId: number, addonId: number) {
    return `content_${this.getUniqueAddonId(categoryId, productId, addonId)}`
  }
  getUniqueAddonHeadingIdWithHash(categoryId: number, productId: number, addonId: number) {
    return `#heading_${this.getUniqueAddonId(categoryId, productId, addonId)}`
  }
  getUniqueAddonContentIdWithHash(categoryId: number, productId: number, addonId: number) {
    return `#content_${this.getUniqueAddonId(categoryId, productId, addonId)}`
  }
}
