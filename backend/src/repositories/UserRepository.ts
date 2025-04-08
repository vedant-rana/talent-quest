import { IUserRepository } from "../interfaces/IUserRepository.js";
import User from "../models/userModel.js";
import { IUser, UserModelType } from "../types/modelTypes/userModelTypes.js";

export const UserRepository: IUserRepository = {
  async getAllUsers(): Promise<IUser[]> {
    return await User.find().select("-password");
  },

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select("-password");
  },

  async getUserByCustomObj(searchObj: object): Promise<IUser | null> {
    return await User.findOne(searchObj).select("-password");
  },

  async createUser(data: UserModelType): Promise<IUser | null> {
    return await User.create(data);
  },

  async updateUser(id: string, data: UserModelType): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-password");
  },

  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id).select("-password");
  },
};
