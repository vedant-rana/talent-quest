import { Schema } from "mongoose";
import { QuestionTypeEnum } from "../../utils/enums/commonEnums.js";

export type QuestionModelType = {
  title: string;
  note: string;
  questionType: QuestionTypeEnum;
  score: number;
  exam: string | Schema.Types.ObjectId;
  createdBy: string | Schema.Types.ObjectId;
  updatedBy: string | Schema.Types.ObjectId;
};

export type IQuestion = QuestionModelType & Document;
