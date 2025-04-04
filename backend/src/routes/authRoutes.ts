import express from "express";
import {
  loginUser,
  signupUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/login").post(loginUser);

router.route("/signup").post(signupUser);

router.route("/logout").get(logoutUser);

export default router;
