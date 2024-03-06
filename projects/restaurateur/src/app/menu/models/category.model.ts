import { Item } from './item.model'

export class Category {
    constructor(
        public id: number,
        public name: string,
        public items: Item[],
        public sequence?: number,
        public description?: string,
        
    ) {}
}