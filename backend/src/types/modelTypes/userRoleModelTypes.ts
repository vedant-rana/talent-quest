import { Document } from "mongoose";

export type UserRoleModelType = {
  roleName: string;
  isActive: boolean;
};

export type UserRoleModel = UserRoleModelType & {
  roleCode: number;
  isDeactivatable: boolean;
};

// export type

export type IUserRole = UserRoleModel & Document;
