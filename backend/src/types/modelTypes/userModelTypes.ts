import { Document } from "mongoose";

export type UserModelType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  isActive: boolean;
};

export type IUser = UserModelType &
  Document & {
    comparePassword(candidatePassword: string): Promise<boolean>;
    getJWTToken(): string;
  };
