import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { AuthRepository } from "../repositories/AuthRepository.js";
import { LoginType } from "../types/authTypes/authTypes.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { sendToken } from "../utils/manageJwtToken.js";
import { successResponse } from "../utils/responseFunction.js";

export const loginUser = TryCatch(async (req, res, next) => {
  const reqObj: LoginType = req.body;

  const user = await AuthRepository.login(reqObj);

  if (!user) {
    return next(
      new ErrorHandler("Invalid credentials", HttpStatus.UNAUTHORIZED)
    );
  }

  return sendToken(
    res,
    next,
    user,
    HttpStatus.OK,
    "User logged in successfully"
  );
});

export const logoutUser = TryCatch(async (req, res, next) => {
  res
    .clearCookie("token")
    .json(successResponse(null, "User logged out successfully"));
});
