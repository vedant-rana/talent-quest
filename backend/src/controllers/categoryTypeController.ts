import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { CategoryTypeType } from "../types/modelTypes/categoryTypeTypes.js";
import ErrorHandler from "../utils/customError.js";
import { successResponse } from "../utils/responseFunction.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { CategoryTypeRepository as ctRepository } from "../repositories/CategoryTypeRepository.js";
import { validateWithSchema } from "../utils/validations/validateFunctions.js";
import { categoryTypeValidationSchema } from "../utils/validations/masterValidationSchemas/categoryTypeValidationSchema.js";
import { isObjectIdValid } from "../utils/validations/commonValidationSchemas.js";

export const getAllCategoryTypes = TryCatch(async (req, res, next) => {
  const categoryTypes = await ctRepository.getAllCategoryTypes();

  return res
    .status(HttpStatus.OK)
    .json(
      successResponse(categoryTypes, "Category types fetched successfully")
    );
});

export const getCategoryTypeById = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const categoryType = await ctRepository.getCategoryTypeById(id);

  if (!categoryType) {
    return next(
      new ErrorHandler("Category type not found", HttpStatus.NOT_FOUND)
    );
  }

  return res
    .status(HttpStatus.OK)
    .json(
      successResponse(
        categoryType,
        `Category type with id = ${id} fetched successfully`
      )
    );
});

export const createCategoryType = TryCatch(async (req, res, next) => {
  const reqObj: CategoryTypeType = req.body;

  const validReqObj = validateWithSchema<CategoryTypeType>(
    categoryTypeValidationSchema,
    reqObj
  );

  const isExist = await ctRepository.getCategoryTypeByCustomObj({
    categoryTypeName: validReqObj.categoryTypeName,
  });

  if (isExist) {
    return next(
      new ErrorHandler("Category Type already Exists!!", HttpStatus.CONFLICT)
    );
  }

  const categoryType = await ctRepository.createCategoryType(validReqObj);

  return res
    .status(HttpStatus.CREATED)
    .json(successResponse(categoryType, "Category type created successfully"));
});

export const updateCategoryType = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const reqObj: CategoryTypeType = validateWithSchema<CategoryTypeType>(
    categoryTypeValidationSchema,
    req.body
  );

  const isExist = await ctRepository.getCategoryTypeById(id);

  if (!isExist) {
    return next(
      new ErrorHandler("Category type not found", HttpStatus.NOT_FOUND)
    );
  }

  const isNameExist = await ctRepository.getCategoryTypeByCustomObj({
    categoryTypeName: reqObj.categoryTypeName,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (isNameExist) {
    return next(
      new ErrorHandler(
        `Category Type with Name: ${reqObj.categoryTypeName} already Exists!!`,
        HttpStatus.CONFLICT
      )
    );
  }

  const updatedCategoryType = await ctRepository.updateCategoryType(id, reqObj);

  return res
    .status(HttpStatus.OK)
    .json(
      successResponse(updatedCategoryType, "Category type updated successfully")
    );
});

export const deleteCategoryType = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const categoryType = await ctRepository.getCategoryTypeById(id);

  if (!categoryType) {
    return next(
      new ErrorHandler(
        `Category type with id: ${id} not found`,
        HttpStatus.NOT_FOUND
      )
    );
  }

  const deletedCategory = await ctRepository.deleteCategoryType(id);

  return res
    .status(HttpStatus.OK)
    .json(
      successResponse(deletedCategory, "Category type deleted successfully")
    );
});
