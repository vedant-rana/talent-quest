import { Document } from "mongoose";

export type UserRoleModelType = {
  roleCode: number;
  roleName: string;
  isActive: boolean;
};

export type IUserRole = UserRoleModelType & Document;
