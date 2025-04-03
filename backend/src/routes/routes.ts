import express from "express";
import categoryTypeRoutes from "./categoryTypeRoutes.js";

const router = express.Router();

router.use("/category-type", categoryTypeRoutes);

export default router;
