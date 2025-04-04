import { Request } from "express";

export interface ApiResponse<T> {
  success: boolean;
  data?: T; // Generic type to allow flexibility
  message?: string;
  error?: any; // Optional, to handle error details
}

export interface CustomRequest extends Request {
  user?: any;
  role?: number;
}
