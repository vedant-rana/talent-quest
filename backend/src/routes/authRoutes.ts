import express from "express";
import { loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

export default router;
