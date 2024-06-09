import { IUser } from "../models/model";
const baseUrl = `http://dummyjson.com/users/search?q=`;
export const fetchUserData = async (name: string): Promise<IUser[]> => {
  const response = await fetch(`${baseUrl}${name}`);
  const data: { users: IUser[] } = await response.json();
  return data?.users;
};
