import { NextFunction, Response } from "express";
import { IUser } from "../types/modelTypes/userModelTypes.js";
import { successResponse } from "./responseFunction.js";
import ErrorHandler from "./customError.js";
import HttpStatus from "./httpStatusCodes.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export const sendToken = (
  res: Response,
  next: NextFunction,
  user: IUser | null,
  statusCode: number,
  message: string
) => {
  const token = user?.getJWTToken();

  if (!token) {
    return next(
      new ErrorHandler(
        "Token creation failed!!",
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    );
  }

  const cookieExpiresDays: number =
    Number(process.env.COOKIE_EXPIRES_DAYS) || 5;

  const options = {
    expires: new Date(Date.now() + cookieExpiresDays * 24 * 60 * 60 * 1000),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json(successResponse(user, message));
};

export const verifyJWTToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};
