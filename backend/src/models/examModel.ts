import { Schema, Model, model } from "mongoose";
import { IExam } from "../types/modelTypes/examModelTypes.js";
import { ExamLevelEnum } from "../utils/enums/commonEnums.js";

const ExamSchema: Schema = new Schema<IExam>(
  {
    name: {
      type: String,
      required: [true, "Exam Name is required"],
      unique: [true, "Exam Name must be unique"],
    },
    description: {
      type: String,
    },
    level: {
      type: String,
      enum: Object.values(ExamLevelEnum),
      required: [true, "Level is required"],
    },
    logo: {
      type: Schema.Types.ObjectId,
      ref: "Logo",
      required: [true, "Logo is required"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
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

const Exam: Model<IExam> = model<IExam>("Exam", ExamSchema);

export default Exam;
