import { Schema } from "joi";
import ErrorHandler from "../customError.js";
import HttpStatus from "../httpStatusCodes.js";

export const validateWithSchema = <T>(schema: Schema, data: any): T => {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    throw new ErrorHandler(
      `Validation Error: ${error.message}`,
      HttpStatus.BAD_REQUEST
    );
  }

  return value as T;
};
