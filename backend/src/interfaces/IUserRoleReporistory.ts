import {
  IUserRole,
  UserRoleModelType,
} from "../types/modelTypes/userRoleModelTypes.js";

export interface IUserRoleRepository {
  getAllUserRoles(): Promise<IUserRole[]>;

  getUserRoleById(id: string): Promise<IUserRole | null>;

  getUserRoleByCustomObj(searchObj: object): Promise<IUserRole | null>;

  createUserRole(category: UserRoleModelType): Promise<IUserRole | null>;

  updateUserRole(
    id: string,
    category: UserRoleModelType
  ): Promise<IUserRole | null>;

  deleteUserRole(id: string): Promise<IUserRole | null>;
}
