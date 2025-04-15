import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { QuestionRepository as qRepo } from "../repositories/QuestionRepository.js";
import { QuestionModelType } from "../types/modelTypes/questionModelTypes.js";
import { CustomRequest } from "../types/reqResTypes/responseTypes.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { successResponse } from "../utils/responseFunction.js";
import { isObjectIdValid } from "../utils/validations/commonValidationSchemas.js";
import { validateWithSchema } from "../utils/validations/validateFunctions.js";
import { questionValidationSchema } from "../utils/validations/masterValidationSchemas/questionValidationSchema.js";

export const getAllQuestions = TryCatch(async (req, res, next) => {
  const Questions = await qRepo.getAllQuestions();

  return res
    .status(HttpStatus.OK)
    .json(successResponse(Questions, "Questions fetched successfully"));
});

export const getQuestionById = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const data = await qRepo.getQuestionById(id);

  if (!data) {
    return next(new ErrorHandler("Question not found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(
      successResponse(data, `Question with id = ${id} fetched successfully`)
    );
});

export const createQuestion = TryCatch(
  async (req: CustomRequest, res, next) => {
    const reqObj: QuestionModelType = req.body;

    const validReqObj = validateWithSchema<QuestionModelType>(
      questionValidationSchema,
      reqObj
    );

    validReqObj.createdBy = String(req.user?._id);
    validReqObj.updatedBy = String(req.user?._id);

    const isExist = await qRepo.getQuestionByCustomObj({
      QuestionName: validReqObj.title,
    });

    if (isExist) {
      return next(
        new ErrorHandler("Question already Exists!!", HttpStatus.CONFLICT)
      );
    }

    const Question = await qRepo.createQuestion(validReqObj);

    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(Question, "Question created successfully"));
  }
);

export const updateQuestion = TryCatch(
  async (req: CustomRequest, res, next) => {
    const id = isObjectIdValid(req.params.id);

    const reqObj: QuestionModelType = validateWithSchema<QuestionModelType>(
      questionValidationSchema,
      req.body
    );

    const isExist = await qRepo.getQuestionById(id);

    if (!isExist) {
      return next(new ErrorHandler("Question not found", HttpStatus.NOT_FOUND));
    }

    const isNameExist = await qRepo.getQuestionByCustomObj({
      QuestionName: reqObj.title,
      _id: { $ne: new mongoose.Types.ObjectId(id) },
    });

    if (isNameExist) {
      return next(
        new ErrorHandler(
          `Question with Name: ${reqObj.title} already Exists!!`,
          HttpStatus.CONFLICT
        )
      );
    }

    reqObj.updatedBy = String(req.user?._id);

    const updatedQuestion = await qRepo.updateQuestion(id, reqObj);

    return res
      .status(HttpStatus.OK)
      .json(successResponse(updatedQuestion, "Question updated successfully"));
  }
);

export const deleteQuestion = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const Question = await qRepo.getQuestionById(id);

  if (!Question) {
    return next(
      new ErrorHandler(
        `Question with id: ${id} not found`,
        HttpStatus.NOT_FOUND
      )
    );
  }

  const deletedQuestion = await qRepo.deleteQuestion(id);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deletedQuestion, "Question deleted successfully"));
});

export const getAllQuestionTypes = TryCatch(async (req, res, next) => {
  const lstData = await qRepo.getQuestionTypes();

  if (lstData.length <= 0) {
    return next(
      new ErrorHandler("Question Types Not Found !!", HttpStatus.NOT_FOUND)
    );
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(lstData, "Question Types Fetched Successfully !!"));
});
