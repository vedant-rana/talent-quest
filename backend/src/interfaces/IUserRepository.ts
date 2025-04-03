import { IUser, UserModelType } from "../types/modelTypes/userModelTypes.js";

export interface IUserRepository {
  getAllUsers(): Promise<IUser[]>;

  getUserById(id: string): Promise<IUser | null>;

  getUserByCustomObj(searchObj: object): Promise<IUser | null>;

  createUser(category: UserModelType): Promise<IUser | null>;

  updateUser(id: string, category: UserModelType): Promise<IUser | null>;

  deleteUser(id: string): Promise<IUser | null>;
}
