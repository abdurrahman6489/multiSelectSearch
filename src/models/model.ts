export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: 28;
  gender: "female" | "male";
  email: string;
  image: string;
}
export interface IUserSelected extends IUser {}
