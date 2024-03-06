import { CategoryPOST } from "./category-post.model";
export class MenuPOST {
    constructor(
        public name: string,
        public description: string,
        public categories: CategoryPOST[]
    ){}
}