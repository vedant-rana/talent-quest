import { Model, Schema, model } from "mongoose";
import { IUserRole } from "../types/modelTypes/userRoleModelTypes.js";

const userRoleSchema: Schema = new Schema<IUserRole>(
  {
    roleCode: {
      type: Number,
      required: [true, "Role Code is required"],
      unique: [true, "Role Code must be unique"],
    },
    roleName: {
      type: String,
      required: [true, "Role Name is required"],
      unique: [true, "Role Name must be unique"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeactivatable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserRole: Model<IUserRole> = model<IUserRole>("UserRole", userRoleSchema);

export default UserRole;
