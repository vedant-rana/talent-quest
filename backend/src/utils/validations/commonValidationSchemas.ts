import Joi from "joi";
import ErrorHandler from "../customError.js";

const idValidationObject = Joi.string().length(24).hex().required().messages({
  "string.base": "ID must be a string.",
  "string.empty": "ID is not valid!!",
  "string.length": "ID must be exactly 24 characters long.",
  "any.required": "ID is not valid!!",
});

const idValidationSchema = Joi.object({
  id: idValidationObject,
});

export const isObjectIdValid = (data: any): string => {
  const { error, value } = idValidationSchema.validate(
    { id: data },
    {
      abortEarly: false,
    }
  );

  if (error) {
    throw new ErrorHandler(`Validation Error : ${error.message}`, 400);
  }

  return value.id as string;
};
