interface User {
  _id?: string;
  name?: string;
  email: string;
}

export interface IUser extends User {
  password: string;
  passwordConfirm?: string;
}

export interface IUserDecoded extends User {
  exp: number;
}

export interface IUserResult extends User {
  createdAt: string;
  updatedAt: string;
  __v: number;
}
