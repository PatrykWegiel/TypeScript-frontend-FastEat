import { Category } from "./category.model";

export class Menu {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public categories: Category[]
    ){}
}