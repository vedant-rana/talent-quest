import express from "express";
import { createLogo } from "../../controllers/logoController.js";
import { upload } from "../../config/multer.js";

const router = express.Router();

router.route("/all").get();
router.route("/new").post(upload.single("logoFile"), createLogo);
router.route("/:id").get().put().delete();

export default router;
