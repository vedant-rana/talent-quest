import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { successResponse } from "../utils/responseFunction.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { LogoReqModel } from "../types/modelTypes/logoTypes.js";
import { validateWithSchema } from "../utils/validations/validateFunctions.js";
import { logoValidSchema } from "../utils/validations/masterValidationSchemas/logoValidationSchema.js";
import { LogoRepository as logoRepo } from "../repositories/LogoRepository.js";
import { isObjectIdValid } from "../utils/validations/commonValidationSchemas.js";
import ErrorHandler from "../utils/customError.js";
import { CommonRepository } from "../repositories/CommonRepository.js";
import mongoose from "mongoose";

const getUrlPath = (fileName: string) => {
  return `uploads/logos/${fileName}`;
};

export const getAllLogos = TryCatch(async (req, res, next) => {
  const data = await logoRepo.getAllLogos();

  return res
    .status(HttpStatus.OK)
    .json(successResponse(data, "Logos fetched successfully"));
});

export const getLogoById = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const data = await logoRepo.getLogoById(id);

  if (!data) {
    return next(new ErrorHandler("Logo not found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(data, `Logo with id = ${id} fetched successfully`));
});

export const createLogo = TryCatch(async (req, res, next) => {
  const file = req.file;

  const reqObj: LogoReqModel = validateWithSchema<LogoReqModel>(
    logoValidSchema,
    req.body
  );

  if (file != null) {
    reqObj.logoUrl = getUrlPath(file.filename);
  }

  const isExist = await logoRepo.getLogoByCustomObj({
    name: reqObj.name,
  });

  if (isExist) {
    CommonRepository.deleteFileFromServer(reqObj.logoUrl);
    return next(
      new ErrorHandler(
        "Logo already Exists with this Name!!",
        HttpStatus.CONFLICT
      )
    );
  }

  const logo = await logoRepo.createLogo(reqObj);

  return res
    .status(HttpStatus.CREATED)
    .json(successResponse(logo, "Logo created successfully !!"));
});

export const updateLogo = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);
  const file = req.file;
  const reqObj: LogoReqModel = validateWithSchema<LogoReqModel>(
    logoValidSchema,
    req.body
  );

  if (file != null) {
    reqObj.logoUrl = getUrlPath(file.filename);
  }

  const isExist = await logoRepo.getLogoById(id);

  if (!isExist) {
    CommonRepository.deleteFileFromServer(reqObj.logoUrl);
    return next(new ErrorHandler("Logo not found", HttpStatus.NOT_FOUND));
  } else {
    //checking if update object not have file then logoUrl will not be changed in DB
    if (file == null) {
      reqObj.logoUrl = isExist.logoUrl;
    }
  }

  const isExistWithOtherParams = await logoRepo.getLogoByCustomObj({
    name: reqObj.name,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (isExistWithOtherParams) {
    CommonRepository.deleteFileFromServer(reqObj.logoUrl);
    return next(new ErrorHandler(`Logo already Exists!!`, HttpStatus.CONFLICT));
  }

  const previousLogoUrl = isExist.logoUrl;
  const updated = await logoRepo.updateLogo(id, reqObj);

  if (updated != null) {
    if (previousLogoUrl !== updated.logoUrl) {
      CommonRepository.deleteFileFromServer(previousLogoUrl);
    }
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(updated, "Logo updated successfully"));
});

export const deleteLogo = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const isExist = await logoRepo.getLogoById(id);

  if (!isExist) {
    return next(
      new ErrorHandler(`Logo with id: ${id} not found`, HttpStatus.NOT_FOUND)
    );
  }

  const deleted = await logoRepo.deleteLogo(id);

  if (deleted != null) {
    CommonRepository.deleteFileFromServer(deleted.logoUrl);
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deleted, "Logo deleted successfully"));
});
