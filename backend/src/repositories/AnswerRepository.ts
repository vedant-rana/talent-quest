import { IAnswerRepository } from "../interfaces/IAnswerRepository.js";
import Answer from "../models/answerModel.js";
import Question from "../models/questionModel.js";
import { DropDownListItem } from "../types/commonTypes.js";
import {
  AnswerModelType,
  IAnswer,
} from "../types/modelTypes/answerModelTypes.js";
import { QuestionTypeEnum } from "../utils/enums/commonEnums.js";

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

  async getQuestionsForSelectiveAns(): Promise<DropDownListItem[]> {
    const questions = await Question.find({
      $or: [
        { questionType: QuestionTypeEnum.SingleChoice },
        { questionType: QuestionTypeEnum.MultipleChoice },
      ],
    }).select("title _id");

    return questions.map((que) => {
      const data: DropDownListItem = {
        text: que.title,
        value: que._id.toString(),
      };

      return data;
    });
  },
};
