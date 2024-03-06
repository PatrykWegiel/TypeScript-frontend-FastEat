import { ItemPOST } from './item-post.model';

export class CategoryPOST {
    constructor(
        public name: string,
        public items: ItemPOST[],
        public description?: string,
        public sequence?: number,
        
    ) {}
}