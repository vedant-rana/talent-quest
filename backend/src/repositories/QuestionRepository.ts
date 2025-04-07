import { IQuestionRepository } from "../interfaces/IQuestionRepository.js";
import Question from "../models/questionModel.js";
import {
  IQuestion,
  QuestionModelType,
} from "../types/modelTypes/questionModelTypes.js";

export const QuestionRepository: IQuestionRepository = {
  async getAllQuestions(): Promise<IQuestion[]> {
    return await Question.find().populate([
      { path: "exam", select: "name level" },
    ]);
  },

  async getQuestionById(id: string): Promise<IQuestion | null> {
    return await Question.findById(id).populate([
      { path: "exam", select: "name level" },
      { path: "createdBy", select: "firstName lastName email" },
      { path: "updatedBy", select: "firstName lastName email" },
    ]);
  },

  async getQuestionByCustomObj(searchObj: object): Promise<IQuestion | null> {
    return await Question.findOne(searchObj);
  },

  async createQuestion(data: QuestionModelType): Promise<IQuestion | null> {
    return await Question.create(data);
  },

  async updateQuestion(
    id: string,
    data: QuestionModelType
  ): Promise<IQuestion | null> {
    return Question.findByIdAndUpdate(id, data, {
      new: true,
    });
  },

  async deleteQuestion(id: string): Promise<IQuestion | null> {
    return Question.findByIdAndDelete(id);
  },
};
