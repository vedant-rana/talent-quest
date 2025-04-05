import express from "express";
import {
  createLogo,
  deleteLogo,
  getAllLogos,
  getLogoById,
  updateLogo,
} from "../../controllers/logoController.js";
import { upload } from "../../config/multer.js";

const router = express.Router();

router.route("/all").get(getAllLogos);

router.route("/new").post(upload.single("logo"), createLogo);

router
  .route("/:id")
  .get(getLogoById)
  .put(upload.single("logo"), updateLogo)
  .delete(deleteLogo);

export default router;
