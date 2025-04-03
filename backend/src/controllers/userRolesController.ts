import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { USerRoleRepository as urRepository } from "../repositories/UserRoleReporistory.js";
import { UserRoleModelType } from "../types/modelTypes/userRoleModelTypes.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { successResponse } from "../utils/responseFunction.js";

export const getAllRoles = TryCatch(async (req, res, next) => {
  const roles = await urRepository.getAllUserRoles();

  return res
    .status(HttpStatus.OK)
    .json(successResponse(roles, "User Roles fetched successfully"));
});

export const getRoleById = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const role = await urRepository.getUserRoleById(id);

  if (!role) {
    return next(new ErrorHandler("User Role not found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(role, `Role with id = ${id} fetched successfully`));
});

export const createRole = TryCatch(async (req, res, next) => {
  const reqObj: UserRoleModelType = { ...req.body, isActive: true };

  const isExist = await urRepository.getUserRoleByCustomObj({
    roleCode: reqObj.roleCode,
    roleName: reqObj.roleName,
  });

  if (isExist) {
    return next(
      new ErrorHandler("User Role already Exists!!", HttpStatus.CONFLICT)
    );
  }

  const role = await urRepository.createUserRole(reqObj);

  return res
    .status(HttpStatus.CREATED)
    .json(successResponse(role, "Role created successfully"));
});

export const updateUserRole = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const reqObj: UserRoleModelType = req.body;

  const isExist = await urRepository.getUserRoleById(id);

  if (!isExist) {
    return next(new ErrorHandler("Role not found", HttpStatus.NOT_FOUND));
  }

  const isExistWithOtherParams = await urRepository.getUserRoleByCustomObj({
    roleCode: reqObj.roleCode,
    roleName: reqObj.roleName,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (isExistWithOtherParams) {
    return next(
      new ErrorHandler(`User Role already Exists!!`, HttpStatus.CONFLICT)
    );
  }

  const updatedRole = await urRepository.updateUserRole(id, reqObj);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(updatedRole, "User Role updated successfully"));
});

export const deleteUserRole = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const isExist = await urRepository.getUserRoleById(id);

  if (!isExist) {
    return next(
      new ErrorHandler(`Role with id: ${id} not found`, HttpStatus.NOT_FOUND)
    );
  }

  const deleted = await urRepository.deleteUserRole(id);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deleted, "Role deleted successfully"));
});
