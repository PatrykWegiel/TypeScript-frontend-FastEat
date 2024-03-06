import { menuCategory } from "./menu-category";

export class Menu {
    constructor(
      public id: number = 0,
      public description: string = "",
      public name:string = "",
      public categories: menuCategory[] = [],
     ) {};
}