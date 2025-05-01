import Joi from "joi";
import { QuestionTypeEnum } from "../../enums/commonEnums.js";
import { answerWithQuestionValidationSchema } from "./answerValidationSchema.js";

const typeValues = Object.values(QuestionTypeEnum);
// .filter(
//   (value) => typeof value === "string"
// );

const questionJoiObject = {
  title: Joi.string().trim().min(2).max(255).required(),
  note: Joi.string().trim().min(2).max(255).optional(),
  questionType: Joi.string()
    .valid(...typeValues)
    .required(),
  score: Joi.number().integer().min(1).max(100).required(),
  exam: Joi.string().trim().length(24).hex().required(),
};

export const questionValidationSchema = Joi.object(questionJoiObject);

const questionWithAnswersObject = {
  question: questionValidationSchema.required(),
  options: Joi.alternatives().conditional("question.questionType", {
    is: QuestionTypeEnum.Descriptive,
    then: Joi.forbidden(), // or Joi.optional(), depending on your requirement
    otherwise: Joi.array()
      .items(answerWithQuestionValidationSchema)
      .min(2)
      .required()
      .messages({
        "array.min": "At least 2 options are required.",
      }),
  }),
};

export const questionWithOptionsValidationSchema = Joi.object(
  questionWithAnswersObject
);
