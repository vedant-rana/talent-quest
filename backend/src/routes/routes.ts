import express from "express";
import categoryTypeRoutes from "./categoryTypeRoutes.js";
import userRoleRoutes from "./userRoleRoutes.js";

const router = express.Router();

router.use("/user-role", userRoleRoutes);
router.use("/category-type", categoryTypeRoutes);

export default router;
