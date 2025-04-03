import { IUserRoleRepository } from "../interfaces/IUserRoleReporistory.js";
import UserRole from "../models/userRoleModel.js";
import {
  IUserRole,
  UserRoleModelType,
} from "../types/modelTypes/userRoleModelTypes.js";

export const USerRoleRepository: IUserRoleRepository = {
  async getAllUserRoles(): Promise<IUserRole[]> {
    return await UserRole.find();
  },

  async getUserRoleById(id: string): Promise<IUserRole | null> {
    return await UserRole.findById(id);
  },

  async getUserRoleByCustomObj(searchObj: object): Promise<IUserRole | null> {
    return await UserRole.findOne(searchObj);
  },

  async createUserRole(role: UserRoleModelType): Promise<IUserRole | null> {
    return await UserRole.create(role);
  },

  async updateUserRole(
    id: string,
    role: UserRoleModelType
  ): Promise<IUserRole | null> {
    return UserRole.findByIdAndUpdate(id, role, {
      new: true,
    });
  },

  async deleteUserRole(id: string): Promise<IUserRole | null> {
    return UserRole.findByIdAndDelete(id);
  },
};
