import express from "express";
import userRoleRoutes from "./userRoleRoutes.js";
import userRoutes from "./userRoutes.js";
import logoRoutes from "./logoRoutes.js";
import categoryTypeRoutes from "./categoryTypeRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import examRoutes from "./examRoutes.js";
import questionRoutes from "./questionRoutes.js";
import answerRoutes from "./answerRoutes.js";

const router = express.Router();

router.use("/logo", logoRoutes);
router.use("/user-role", userRoleRoutes);
router.use("/user", userRoutes);
router.use("/category-type", categoryTypeRoutes);
router.use("/category", categoryRoutes);
router.use("/exam", examRoutes);
router.use("/question", questionRoutes);
router.use("/answer", answerRoutes);

export default router;
