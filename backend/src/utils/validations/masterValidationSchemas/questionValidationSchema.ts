import Joi from "joi";
import { QuestionTypeEnum } from "../../enums/commonEnums.js";

const typeValues = Object.values(QuestionTypeEnum);
// .filter(
//   (value) => typeof value === "string"
// );

const questionObject = {
  title: Joi.string().trim().min(2).max(255).required(),
  note: Joi.string().trim().min(2).max(255).optional(),
  questionType: Joi.string()
    .valid(...typeValues)
    .required(),
  score: Joi.number().integer().min(1).max(100).required(),
  exam: Joi.string().trim().length(24).hex().required(),
};

export const questionValidationSchema = Joi.object(questionObject);
