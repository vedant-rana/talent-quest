import { NextFunction, Response } from "express";
import { UserRepository as uRepo } from "../repositories/UserRepository.js";
import { CustomRequest } from "../types/reqResTypes/responseTypes.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { verifyJWTToken } from "../utils/manageJwtToken.js";
import { TryCatch } from "./errorMiddlewares.js";

export const authorization = TryCatch(async (req: CustomRequest, res, next) => {
  const { token } = req.cookies;

  if (token == null) {
    return next(
      new ErrorHandler(
        "Please login to access this resource",
        HttpStatus.UNAUTHORIZED
      )
    );
  }

  const decodedData = await verifyJWTToken(token);
  const user = await uRepo.getUserById(decodedData.id);

  req.user = user;
  next();
});

export const authorizeRoles = (...roles: number[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `You are not allowed to access this resource`,
          HttpStatus.FORBIDDEN
        )
      );
    }

    next();
  };
};
