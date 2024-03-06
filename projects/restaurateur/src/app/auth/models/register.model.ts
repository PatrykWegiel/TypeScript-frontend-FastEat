export class Register {
    constructor(
        public owner: Owner,
        public name: string,
        public street: string,
        public city: string,
        public zipCode: string,
        public phoneNumber: string,
        public kitchenType: number[]
    ) {}
}

export class Owner {
    constructor(
        public email: string,
        public username: string,
        public password: string
    ) {}
}
