import Joi from "joi";

const answerObject = {
  value: Joi.string().trim().min(2).max(255).required(),
  isCorrect: Joi.boolean().optional(),
  question: Joi.string().trim().length(24).hex().required(),
};

export const answerValidationSchema = Joi.object(answerObject);
