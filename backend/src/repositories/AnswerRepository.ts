import { IAnswerRepository } from "../interfaces/IAnswerRepository.js";
import Answer from "../models/answerModel.js";
import {
  AnswerModelType,
  IAnswer,
} from "../types/modelTypes/answerModelTypes.js";

export const AnswerRepository: IAnswerRepository = {
  async getAllAnswers(): Promise<IAnswer[]> {
    return await Answer.find().populate([
      { path: "question", select: "title questionType" },
    ]);
  },

  async getAnswerById(id: string): Promise<IAnswer | null> {
    return await Answer.findById(id).populate([
      { path: "question", select: "title questionType" },
      { path: "createdBy", select: "firstName lastName email" },
      { path: "updatedBy", select: "firstName lastName email" },
    ]);
  },

  async getAnswerByCustomObj(searchObj: object): Promise<IAnswer | null> {
    return await Answer.findOne(searchObj);
  },

  async createAnswer(data: AnswerModelType): Promise<IAnswer | null> {
    return await Answer.create(data);
  },

  async updateAnswer(
    id: string,
    data: AnswerModelType
  ): Promise<IAnswer | null> {
    return Answer.findByIdAndUpdate(id, data, {
      new: true,
    });
  },

  async deleteAnswer(id: string): Promise<IAnswer | null> {
    return Answer.findByIdAndDelete(id);
  },
};
