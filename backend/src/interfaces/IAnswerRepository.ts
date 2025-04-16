import { DropDownListItem } from "../types/commonTypes.js";
import {
  AnswerModelType,
  IAnswer,
} from "../types/modelTypes/answerModelTypes.js";

export interface IAnswerRepository {
  getAllAnswers(): Promise<IAnswer[]>;

  getAnswerById(id: string): Promise<IAnswer | null>;

  getAnswerByCustomObj(searchObj: object): Promise<IAnswer | null>;

  createAnswer(Answer: AnswerModelType): Promise<IAnswer | null>;

  updateAnswer(id: string, Answer: AnswerModelType): Promise<IAnswer | null>;

  deleteAnswer(id: string): Promise<IAnswer | null>;

  getQuestionsForSelectiveAns(): Promise<DropDownListItem[]>;
}
