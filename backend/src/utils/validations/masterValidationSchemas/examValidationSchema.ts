import Joi from "joi";
import { ExamLevelEnum } from "../../enums/commonEnums.js";

const levelValues = Object.values(ExamLevelEnum);
// .filter(
//   (value) => typeof value === "string"
// );

const examObject = {
  name: Joi.string().trim().min(2).max(50).required(),
  description: Joi.string().trim().min(2).max(255).optional(),
  level: Joi.string()
    .valid(...levelValues)
    .required(),
  logo: Joi.string().trim().length(24).hex().required(),
  categoryId: Joi.string().trim().length(24).hex().required(),
};

export const examValidationSchema = Joi.object(examObject);
