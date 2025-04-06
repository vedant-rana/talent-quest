import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../../controllers/categoryController.js";

const router = express.Router();

router.route("/all").get(getAllCategories);

router.route("/new").post(createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
