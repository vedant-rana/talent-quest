import { IUserRoleRepository } from "../interfaces/IUserRoleReporistory.js";
import UserRole from "../models/userRoleModel.js";
import {
  IUserRole,
  UserRoleModel,
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

  async createUserRole(role: UserRoleModel): Promise<IUserRole | null> {
    return await UserRole.create(role);
  },

  async updateUserRole(
    id: string,
    role: UserRoleModel
  ): Promise<IUserRole | null> {
    return UserRole.findByIdAndUpdate(id, role, {
      new: true,
    });
  },

  async deleteUserRole(id: string): Promise<IUserRole | null> {
    return UserRole.findByIdAndDelete(id);
  },

  async getNextRoleCode(): Promise<number> {
    const maxRole: IUserRole = await UserRole.findOne()
      .sort({ roleCode: -1 })
      .select("roleCode");

    return maxRole ? maxRole.roleCode + 1 : 1;
  },
};
