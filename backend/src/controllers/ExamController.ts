import mongoose from "mongoose";
import { TryCatch } from "../middlewares/errorMiddlewares.js";
import { ExamRepository as eRepo } from "../repositories/ExamRepository.js";
import { ExamModelType } from "../types/modelTypes/examModelTypes.js";
import { CustomRequest } from "../types/reqResTypes/responseTypes.js";
import ErrorHandler from "../utils/customError.js";
import HttpStatus from "../utils/httpStatusCodes.js";
import { successResponse } from "../utils/responseFunction.js";
import { isObjectIdValid } from "../utils/validations/commonValidationSchemas.js";
import { examValidationSchema } from "../utils/validations/masterValidationSchemas/examValidationSchema.js";
import { validateWithSchema } from "../utils/validations/validateFunctions.js";

export const getAllExams = TryCatch(async (req, res, next) => {
  const Exams = await eRepo.getAllExams();

  return res
    .status(HttpStatus.OK)
    .json(successResponse(Exams, "Exams fetched successfully"));
});

export const getExamById = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const data = await eRepo.getExamById(id);

  if (!data) {
    return next(new ErrorHandler("Exam not found", HttpStatus.NOT_FOUND));
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(data, `Exam with id = ${id} fetched successfully`));
});

export const createExam = TryCatch(async (req: CustomRequest, res, next) => {
  const reqObj: ExamModelType = req.body;

  const validReqObj = validateWithSchema<ExamModelType>(
    examValidationSchema,
    reqObj
  );

  validReqObj.createdBy = String(req.user?._id);
  validReqObj.updatedBy = String(req.user?._id);

  const isExist = await eRepo.getExamByCustomObj({
    ExamName: validReqObj.name,
  });

  if (isExist) {
    return next(new ErrorHandler("Exam already Exists!!", HttpStatus.CONFLICT));
  }

  const Exam = await eRepo.createExam(validReqObj);

  return res
    .status(HttpStatus.CREATED)
    .json(successResponse(Exam, "Exam created successfully"));
});

export const updateExam = TryCatch(async (req: CustomRequest, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const reqObj: ExamModelType = validateWithSchema<ExamModelType>(
    examValidationSchema,
    req.body
  );

  const isExist = await eRepo.getExamById(id);

  if (!isExist) {
    return next(new ErrorHandler("Exam not found", HttpStatus.NOT_FOUND));
  }

  const isNameExist = await eRepo.getExamByCustomObj({
    ExamName: reqObj.name,
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  });

  if (isNameExist) {
    return next(
      new ErrorHandler(
        `Exam with Name: ${reqObj.name} already Exists!!`,
        HttpStatus.CONFLICT
      )
    );
  }

  reqObj.updatedBy = String(req.user?._id);

  const updatedExam = await eRepo.updateExam(id, reqObj);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(updatedExam, "Exam updated successfully"));
});

export const deleteExam = TryCatch(async (req, res, next) => {
  const id = isObjectIdValid(req.params.id);

  const Exam = await eRepo.getExamById(id);

  if (!Exam) {
    return next(
      new ErrorHandler(`Exam with id: ${id} not found`, HttpStatus.NOT_FOUND)
    );
  }

  const deletedExam = await eRepo.deleteExam(id);

  return res
    .status(HttpStatus.OK)
    .json(successResponse(deletedExam, "Exam deleted successfully"));
});

export const getAllExamTypes = TryCatch(async (req, res, next) => {
  const lstData = await eRepo.getExamTypes();

  if (lstData.length <= 0) {
    return next(
      new ErrorHandler("Exam Types Not Found !!", HttpStatus.NOT_FOUND)
    );
  }

  return res
    .status(HttpStatus.OK)
    .json(successResponse(lstData, "Exam Type Fetched Successfully !!"));
});
