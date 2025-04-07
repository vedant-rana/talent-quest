import { Schema } from "mongoose";

export type AnswerModelType = {
  value: string;
  isCorrect: boolean;
  question: string | Schema.Types.ObjectId;
  createdBy: string | Schema.Types.ObjectId;
  updatedBy: string | Schema.Types.ObjectId;
};

export type IAnswer = AnswerModelType & Document;
