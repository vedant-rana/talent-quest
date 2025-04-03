import { Response } from "express";
import { IUser } from "../types/modelTypes/userModelTypes.js";
import { successResponse } from "./responseFunction.js";

export const sendToken = (
  user: IUser,
  statusCode: number,
  res: Response,
  message: string
) => {
  const token = "";

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
