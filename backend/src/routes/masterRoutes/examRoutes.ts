import express from "express";
import {
  createExam,
  deleteExam,
  getAllExams,
  getAllExamTypes,
  getExamById,
  updateExam,
} from "../../controllers/ExamController.js";

const router = express.Router();

router.route("/all").get(getAllExams);

router.route("/types").get(getAllExamTypes);

router.route("/new").post(createExam);

router.route("/:id").get(getExamById).put(updateExam).delete(deleteExam);

export default router;
