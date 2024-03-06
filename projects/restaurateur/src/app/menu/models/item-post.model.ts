import { AddonPOST } from "./addon-post.model";

export class ItemPOST {
    constructor(
        public name: string,
        public price: number,
        public addons: AddonPOST[],
    ) {}
}