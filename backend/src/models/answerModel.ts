import { Schema, Model, model } from "mongoose";
import { IAnswer } from "../types/modelTypes/answerModelTypes.js";

const AnswerSchema: Schema = new Schema<IAnswer>(
  {
    value: {
      type: String,
      required: [true, "Answer Value is required"],
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Question is required"],
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

const Answer: Model<IAnswer> = model<IAnswer>("Answer", AnswerSchema);

export default Answer;
