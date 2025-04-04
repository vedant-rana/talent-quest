import express from "express";
import {
  createCategoryType,
  deleteCategoryType,
  getAllCategoryTypes,
  getCategoryTypeById,
  updateCategoryType,
} from "../../controllers/categoryTypeController.js";

const router = express.Router();

router.route("/all").get(getAllCategoryTypes);

router.route("/new").post(createCategoryType);

router
  .route("/:id")
  .get(getCategoryTypeById)
  .put(updateCategoryType)
  .delete(deleteCategoryType);

export default router;
