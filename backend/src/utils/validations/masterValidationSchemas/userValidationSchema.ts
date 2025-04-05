import Joi from "joi";
import { RolesEnum } from "../../enums/commonEnums.js";

const roleValues = Object.values(RolesEnum).filter(
  (value) => typeof value === "number"
);

export const userValidSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(30).required(),
  role: Joi.number()
    .valid(...roleValues)
    .optional(),
  isActive: Joi.boolean().optional(),
});
