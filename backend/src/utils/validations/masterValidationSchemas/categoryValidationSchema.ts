import Joi from "joi";

const categoryTypeObject = {
  categoryTypeName: Joi.string().trim().min(2).max(50).required(),
};

export const categoryTypeValidationSchema = Joi.object(categoryTypeObject);
