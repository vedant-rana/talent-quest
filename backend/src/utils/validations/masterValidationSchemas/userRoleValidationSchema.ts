import Joi from "joi";

export const userRoleValidSchema = Joi.object({
  roleName: Joi.string().trim().min(2).max(20).required(),
  isActive: Joi.boolean().optional(),
});
