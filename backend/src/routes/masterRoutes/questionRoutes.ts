import express from "express";
import {
  addQuestionWithAnswers,
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getAllQuestionTypes,
  getQuestionById,
  updateQuestion,
  updateQuestionWithAnswers,
} from "../../controllers/questionController.js";

const router = express.Router();

router.route("/all").get(getAllQuestions);

router.route("/types").get(getAllQuestionTypes);

router.route("/new").post(createQuestion);

router.route("/new-with-answers").post(addQuestionWithAnswers);

router.route("/update-with-answers").put(updateQuestionWithAnswers);

router
  .route("/:id")
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(deleteQuestion);

export default router;
