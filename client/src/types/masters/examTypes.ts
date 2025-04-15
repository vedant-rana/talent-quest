import { Category } from "./categoryTypes";
import { Logo } from "./logoTypes";

export type ExamFormData = {
  name: string;
  description: string;
  level: string;
  logo: string;
  categoryId: string;
};

export type Exam = ExamFormData & {
  _id: string;
  logo: Logo;
  categoryId: Category;
  createdAt: string;
  updatedAt: string;
};
