import express from "express";
import authRoutes from "./authRoutes.js";
import masterRoutes from "./masterRoutes/routes.js";
import {
  authorization,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import { RolesEnum } from "../utils/enums/commonEnums.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use(
  "/masters",
  authorization,
  authorizeRoles(RolesEnum.Admin),
  masterRoutes
);

export default router;
