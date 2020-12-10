interface User {
  name?: string;
  email: string;
}

export interface IUser extends User {
  password: string;
  passwordConfirm?: string;
}

export interface IUserDecoded extends User {
  name: string;
  email: string;
  _id: number;
  exp: number;
}
