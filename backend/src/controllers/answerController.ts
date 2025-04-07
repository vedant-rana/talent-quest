import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { AnswerRepository as aRepo } from "../repositories/AnswerRepository.js";
import { AnswerModelType } from "../types/modelTypes/answerModelTypes.js";
import { CustomRequest } from "../types/reqResTypes/responseTypes.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { successResponse } from "../utils/responseFunction.js";
import { isObjectIdValid } from "../utils/validations/commonValidationSchemas.js";
import { answerValidationSchema } from "../utils/validations/masterValidationSchemas/answerValidationSchema.js";
import { validateWithSchema } from "../utils/validations/validateFunctions.js";

export const getAllAnswers = TryCatch(async (req, res, next) => {
  const Answers = await aRepo.getAllAnswers();

  return res
    .status(HttpStatus.OK)
    .json(successResponse(Answers, "Answers fetched successfully"));
});

export const getAnswerById = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const data = await aRepo.getAnswerById(id);

  if (!data) {
    return next(new ErrorHandler("Answer not found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(data, `Answer with id = ${id} fetched successfully`));
});

export const createAnswer = TryCatch(async (req: CustomRequest, res, next) => {
  const reqObj: AnswerModelType = req.body;

  const validReqObj = validateWithSchema<AnswerModelType>(
    answerValidationSchema,
    reqObj
  );

  validReqObj.createdBy = String(req.user?._id);
  validReqObj.updatedBy = String(req.user?._id);

  const isExist = await aRepo.getAnswerByCustomObj({
    AnswerName: validReqObj.value,
  });

  if (isExist) {
    return next(
      new ErrorHandler("Answer already Exists!!", HttpStatus.CONFLICT)
    );
  }

  const Answer = await aRepo.createAnswer(validReqObj);

  return res
    .status(HttpStatus.CREATED)
    .json(successResponse(Answer, "Answer created successfully"));
});

export const updateAnswer = TryCatch(async (req: CustomRequest, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const reqObj: AnswerModelType = validateWithSchema<AnswerModelType>(
    answerValidationSchema,
    req.body
  );

  const isExist = await aRepo.getAnswerById(id);

  if (!isExist) {
    return next(new ErrorHandler("Answer not found", HttpStatus.NOT_FOUND));
  }

  const isNameExist = await aRepo.getAnswerByCustomObj({
    AnswerName: reqObj.value,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (isNameExist) {
    return next(
      new ErrorHandler(
        `Answer with Name: ${reqObj.value} already Exists!!`,
        HttpStatus.CONFLICT
      )
    );
  }

  reqObj.updatedBy = String(req.user?._id);

  const updatedAnswer = await aRepo.updateAnswer(id, reqObj);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(updatedAnswer, "Answer updated successfully"));
});

export const deleteAnswer = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const Answer = await aRepo.getAnswerById(id);

  if (!Answer) {
    return next(
      new ErrorHandler(`Answer with id: ${id} not found`, HttpStatus.NOT_FOUND)
    );
  }

  const deletedAnswer = await aRepo.deleteAnswer(id);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deletedAnswer, "Answer deleted successfully"));
});
