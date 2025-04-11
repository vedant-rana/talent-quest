import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { USerRoleRepository as urRepository } from "../repositories/UserRoleReporistory.js";
import {
  UserRoleModel,
  UserRoleModelType,
} from "../types/modelTypes/userRoleModelTypes.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { successResponse } from "../utils/responseFunction.js";
import { isObjectIdValid } from "../utils/validations/commonValidationSchemas.js";
import { validateWithSchema } from "../utils/validations/validateFunctions.js";
import { userRoleValidSchema } from "../utils/validations/masterValidationSchemas/userRoleValidationSchema.js";

export const getAllRoles = TryCatch(async (req, res, next) => {
  const roles = await urRepository.getAllUserRoles();

  return res
    .status(HttpStatus.OK)
    .json(successResponse(roles, "User Roles fetched successfully"));
});

export const getRoleById = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const role = await urRepository.getUserRoleById(id);

  if (!role) {
    return next(new ErrorHandler("User Role not found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(role, `Role with id = ${id} fetched successfully`));
});

export const createRole = TryCatch(async (req, res, next) => {
  const reqObj: UserRoleModelType = validateWithSchema<UserRoleModelType>(
    userRoleValidSchema,
    req.body
  );

  const isExist = await urRepository.getUserRoleByCustomObj({
    roleName: reqObj.roleName,
  });

  if (isExist) {
    return next(
      new ErrorHandler("User Role already Exists!!", HttpStatus.CONFLICT)
    );
  }

  const nextRolecode = await urRepository.getNextRoleCode();
  const dataObj: UserRoleModel = {
    ...reqObj,
    isDeactivatable: true,
    roleCode: nextRolecode,
  };

  const role = await urRepository.createUserRole(dataObj);

  return res
    .status(HttpStatus.CREATED)
    .json(successResponse(role, "Role created successfully"));
});

export const updateUserRole = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);
  // const reqObj: UserRoleModelType = req.body;
  const reqObj: UserRoleModelType = validateWithSchema(
    userRoleValidSchema,
    req.body
  );

  const isExist = await urRepository.getUserRoleById(id);

  if (!isExist) {
    return next(new ErrorHandler("Role not found", HttpStatus.NOT_FOUND));
  }

  if (!isExist.isDeactivatable) {
    return next(
      new ErrorHandler(`This Role can't be Modified`, HttpStatus.UNAUTHORIZED)
    );
  }

  const isExistWithOtherParams = await urRepository.getUserRoleByCustomObj({
    roleName: reqObj.roleName,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (isExistWithOtherParams) {
    return next(
      new ErrorHandler(`User Role Name already Exists!!`, HttpStatus.CONFLICT)
    );
  }

  const dataObj: UserRoleModel = {
    ...reqObj,
    isDeactivatable: isExist.isDeactivatable,
    roleCode: isExist.roleCode,
  };

  const updatedRole = await urRepository.updateUserRole(id, dataObj);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(updatedRole, "User Role updated successfully"));
});

export const deleteUserRole = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const isExist = await urRepository.getUserRoleById(id);

  if (!isExist) {
    return next(
      new ErrorHandler(`Role with id: ${id} not found`, HttpStatus.NOT_FOUND)
    );
  }

  if (!isExist.isDeactivatable) {
    return next(
      new ErrorHandler(`This Role can't be Deleted`, HttpStatus.UNAUTHORIZED)
    );
  }

  const deleted = await urRepository.deleteUserRole(id);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deleted, "Role deleted successfully"));
});
