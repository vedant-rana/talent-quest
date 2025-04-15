import { DropDownListItem } from "../types/commonTypes.js";
import {
  IQuestion,
  QuestionModelType,
} from "../types/modelTypes/questionModelTypes.js";

export interface IQuestionRepository {
  getAllQuestions(): Promise<IQuestion[]>;

  getQuestionById(id: string): Promise<IQuestion | null>;

  getQuestionByCustomObj(searchObj: object): Promise<IQuestion | null>;

  createQuestion(Question: QuestionModelType): Promise<IQuestion | null>;

  updateQuestion(
    id: string,
    Question: QuestionModelType
  ): Promise<IQuestion | null>;

  deleteQuestion(id: string): Promise<IQuestion | null>;

  getQuestionTypes(): Promise<DropDownListItem[]>;
}
