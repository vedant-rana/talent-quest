import express from "express";
import {
  createAnswer,
  deleteAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
} from "../../controllers/answerController.js";

const router = express.Router();

router.route("/all").get(getAllAnswers);

router.route("/new").post(createAnswer);

router.route("/:id").get(getAnswerById).put(updateAnswer).delete(deleteAnswer);

export default router;
