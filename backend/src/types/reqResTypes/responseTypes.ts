import { Request } from "express";
import { IUser } from "../modelTypes/userModelTypes.js";

export interface ApiResponse<T> {
  success: boolean;
  data?: T; // Generic type to allow flexibility
  message?: string;
  error?: any; // Optional, to handle error details
}

export interface CustomRequest extends Request {
  user?: IUser | null;
  role?: number;
}
