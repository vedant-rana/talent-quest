import Joi from "joi";

const answerObject = {
  _id: Joi.string().trim().length(24).hex().optional(),
  value: Joi.string().trim().min(2).max(255).required(),
  isCorrect: Joi.boolean().optional(),
  question: Joi.string().trim().length(24).hex().required(),
};

export const answerValidationSchema = Joi.object(answerObject);

const answerWithQuestionObject = {
  // _id: Joi.string().trim().length(24).hex().optional(),
  _id: Joi.alternatives()
    .try(Joi.string().valid(""), Joi.string().length(24).hex())
    .optional(),
  value: Joi.string().trim().min(2).max(255).required(),
  isCorrect: Joi.boolean().optional(),
};

export const answerWithQuestionValidationSchema = Joi.object(
  answerWithQuestionObject
);
