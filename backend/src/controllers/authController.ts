import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { AuthRepository } from "../repositories/AuthRepository.js";
import { LoginType, SignupType } from "../types/authTypes/authTypes.js";
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

export const signupUser = TryCatch(async (req, res, next) => {
  const reqObj: SignupType = req.body;

  const user = await AuthRepository.signup(reqObj);

  if (!user) {
    return next(new ErrorHandler("User alreay Exist", HttpStatus.CONFLICT));
  }

  return sendToken(
    res,
    next,
    user,
    HttpStatus.OK,
    "User Signed Up successfully !!"
  );
});

export const logoutUser = TryCatch(async (req, res, next) => {
  res
    .clearCookie("token")
    .json(successResponse(null, "User logged out successfully"));
});
