import { Exam } from "./examTypes";

export type QuestionFormData = {
  title: string;
  note: string;
  questionType: string;
  score: number;
  exam: string;
};

export type Question = QuestionFormData & {
  _id: string;
  exam: Exam;
  createdAt: string;
  updatedAt: string;
};
