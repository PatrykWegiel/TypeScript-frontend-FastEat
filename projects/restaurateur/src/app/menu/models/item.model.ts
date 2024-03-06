import { Addon } from "./addon.model";

export class Item {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public sequence?: number,
        public image?: string,
        public addons: Addon[] = [],
        public description?: string,
        
    ) {}
}