import { Question } from "./questionTypes";

export type AnswerFormData = {
  value: string;
  isCorrect: boolean;
  question: string;
};

export type Answer = AnswerFormData & {
  _id: string;
  question: Question;
  createdAt: string;
  updatedAt: string;
};
