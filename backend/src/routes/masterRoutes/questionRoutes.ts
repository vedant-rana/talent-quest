import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
} from "../../controllers/questionController.js";

const router = express.Router();

router.route("/all").get(getAllQuestions);

router.route("/new").post(createQuestion);

router
  .route("/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

export default router;
