export class RegisterModel {
  constructor(
    public username: string,
    public email: string,
    public password: string
  ) { }
}

export class LoginModel {
  constructor(
    public email: string,
    public password: string
  ) { }
}

export class AuthenticatedModel {
  constructor(
    public token: string,
    public username: string,
    public email: string,
    public image: string
  ) { }
}
export class ChangePasswordModel {
  constructor(
    public password: string,
    public new_password: string
  ) { }
}