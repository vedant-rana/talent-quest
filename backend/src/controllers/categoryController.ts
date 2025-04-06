import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { CategoryRepository as cRepository } from "../repositories/CategoryRepository.js";
import { CategoryModelType } from "../types/modelTypes/categoryModelTypes.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { successResponse } from "../utils/responseFunction.js";
import { isObjectIdValid } from "../utils/validations/commonValidationSchemas.js";
import { categoryValidationSchema } from "../utils/validations/masterValidationSchemas/categoryValidationSchema.js";
import { validateWithSchema } from "../utils/validations/validateFunctions.js";
import { CustomRequest } from "../types/reqResTypes/responseTypes.js";

export const getAllCategories = TryCatch(async (req, res, next) => {
  const Categorys = await cRepository.getAllCategories();

  return res
    .status(HttpStatus.OK)
    .json(successResponse(Categorys, "Categories fetched successfully"));
});

export const getCategoryById = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const data = await cRepository.getCategoryById(id);

  if (!data) {
    return next(new ErrorHandler("Category not found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(
      successResponse(data, `Category with id = ${id} fetched successfully`)
    );
});

export const createCategory = TryCatch(
  async (req: CustomRequest, res, next) => {
    const reqObj: CategoryModelType = req.body;

    const validReqObj = validateWithSchema<CategoryModelType>(
      categoryValidationSchema,
      reqObj
    );

    validReqObj.createdBy = String(req.user?._id);
    validReqObj.updatedBy = String(req.user?._id);

    const isExist = await cRepository.getCategoryByCustomObj({
      CategoryName: validReqObj.categoryName,
    });

    if (isExist) {
      return next(
        new ErrorHandler("Category already Exists!!", HttpStatus.CONFLICT)
      );
    }

    const Category = await cRepository.createCategory(validReqObj);

    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(Category, "Category created successfully"));
  }
);

export const updateCategory = TryCatch(
  async (req: CustomRequest, res, next) => {
    const id = isObjectIdValid(req.params.id);

    const reqObj: CategoryModelType = validateWithSchema<CategoryModelType>(
      categoryValidationSchema,
      req.body
    );

    const isExist = await cRepository.getCategoryById(id);

    if (!isExist) {
      return next(new ErrorHandler("Category not found", HttpStatus.NOT_FOUND));
    }

    const isNameExist = await cRepository.getCategoryByCustomObj({
      categoryName: reqObj.categoryName,
      _id: { $ne: new mongoose.Types.ObjectId(id) },
    });

    if (isNameExist) {
      return next(
        new ErrorHandler(
          `Category with Name: ${reqObj.categoryName} already Exists!!`,
          HttpStatus.CONFLICT
        )
      );
    }

    reqObj.updatedBy = String(req.user?._id);

    const updatedCategory = await cRepository.updateCategory(id, reqObj);

    return res
      .status(HttpStatus.OK)
      .json(successResponse(updatedCategory, "Category updated successfully"));
  }
);

export const deleteCategory = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const Category = await cRepository.getCategoryById(id);

  if (!Category) {
    return next(
      new ErrorHandler(
        `Category with id: ${id} not found`,
        HttpStatus.NOT_FOUND
      )
    );
  }

  const deletedCategory = await cRepository.deleteCategory(id);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deletedCategory, "Category deleted successfully"));
});
