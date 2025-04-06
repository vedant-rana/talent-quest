import Joi from "joi";

const categoryObject = {
  categoryName: Joi.string().trim().min(2).max(50).required(),
  description: Joi.string().trim().min(2).max(255).optional(),
  logo: Joi.string().trim().length(24).hex().required(),
  type: Joi.string().trim().length(24).hex().required(),
};

export const categoryValidationSchema = Joi.object(categoryObject);
