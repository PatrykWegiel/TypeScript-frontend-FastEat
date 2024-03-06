export class Login {
    constructor(
        public email: string,
        public password: string
    ) {}
}

export class User {
    constructor(
        public username: string,
        public token: string
    ) {}
}

