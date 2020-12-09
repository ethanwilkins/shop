export default interface IUser {
  _id?: number;
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  exp: number;
}
