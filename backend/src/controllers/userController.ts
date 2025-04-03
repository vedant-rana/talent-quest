import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { successResponse } from "../utils/responseFunction.js";
import { UserRepository as uRepo } from "../repositories/UserRepository.js";
import { UserModelType } from "../types/modelTypes/userModelTypes.js";
import { sendToken } from "../utils/manageJwtToken.js";

export const getAllUsers = TryCatch(async (req, res, next) => {
  const roles = await uRepo.getAllUsers();

  return res
    .status(HttpStatus.OK)
    .json(successResponse(roles, "Users fetched successfully"));
});

export const getUserById = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await uRepo.getUserById(id);

  if (!user) {
    return next(new ErrorHandler("User not found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(user, `User with id = ${id} fetched successfully`));
});

export const createUser = TryCatch(async (req, res, next) => {
  const reqObj: UserModelType = { ...req.body, isActive: true };

  const isExist = await uRepo.getUserByCustomObj({
    email: reqObj.email,
  });

  if (isExist) {
    return next(new ErrorHandler("User already Exists!!", HttpStatus.CONFLICT));
  }

  const user = await uRepo.createUser(reqObj);

  return sendToken(
    res,
    next,
    user,
    HttpStatus.CREATED,
    "User created successfully"
  );
  // return res
  //   .status(HttpStatus.CREATED)
  //   .json(successResponse(user, "User created successfully"));
});

export const updateUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const reqObj: UserModelType = req.body;

  const isExist = await uRepo.getUserById(id);

  if (!isExist) {
    return next(new ErrorHandler("User not found", HttpStatus.NOT_FOUND));
  }

  const isExistWithOtherParams = await uRepo.getUserByCustomObj({
    email: reqObj.email,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (isExistWithOtherParams) {
    return next(new ErrorHandler(`User already Exists!!`, HttpStatus.CONFLICT));
  }

  const updated = await uRepo.updateUser(id, reqObj);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(updated, "User updated successfully"));
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const isExist = await uRepo.getUserById(id);

  if (!isExist) {
    return next(
      new ErrorHandler(`User with id: ${id} not found`, HttpStatus.NOT_FOUND)
    );
  }

  const deleted = await uRepo.deleteUser(id);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deleted, "User deleted successfully"));
});
