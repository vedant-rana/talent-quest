import { IUserRepository } from "../interfaces/IUserRepository.js";
import User from "../models/userModel.js";
import { IUser, UserModelType } from "../types/modelTypes/userModelTypes.js";

export const UserRepository: IUserRepository = {
  async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  },

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  },

  async getUserByCustomObj(searchObj: object): Promise<IUser | null> {
    return await User.findOne(searchObj);
  },

  async createUser(category: UserModelType): Promise<IUser | null> {
    return await User.create(category);
  },

  async updateUser(id: string, category: UserModelType): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, category, {
      new: true,
    });
  },

  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  },
};
