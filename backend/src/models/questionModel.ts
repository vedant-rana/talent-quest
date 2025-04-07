import { Schema, Model, model } from "mongoose";
import { IQuestion } from "../types/modelTypes/questionModelTypes.js";
import { QuestionTypeEnum } from "../utils/enums/commonEnums.js";

const QuestionSchema: Schema = new Schema<IQuestion>(
  {
    title: {
      type: String,
      required: [true, "Quesion Title is required"],
      unique: [true, "Quesion Title must be unique"],
    },
    note: {
      type: String,
    },
    questionType: {
      type: String,
      enum: Object.values(QuestionTypeEnum),
      required: [true, "Question type is required"],
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by by is required"],
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Updated by is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Question: Model<IQuestion> = model<IQuestion>("Question", QuestionSchema);

export default Question;
