import Joi from "joi";

export const logoValidSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
});
