import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import ErrorHandler from "../utils/customError.js";
import { successResponse } from "../utils/responseFunction.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { ILogo } from "../types/modelTypes/logoTypes.js";

export const createLogo = TryCatch(async (req, res, next) => {
  const file = req.file;
  const { name }: ILogo = req.body;

  if (!file) {
    return next(
      new ErrorHandler("Logo file is required", HttpStatus.BAD_REQUEST)
    );
  }

  const logoUrl = `uploads/logos/${file.filename}`;
  console.log("logourl : ", logoUrl);

  // const categoryType = await ctRepository.createCategoryType();

  return res
    .status(HttpStatus.CREATED)
    .json(successResponse(null, "Logo created successfully !!"));
});
