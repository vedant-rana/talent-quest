import mongoose from "mongoose";
import { IQuestionRepository } from "../interfaces/IQuestionRepository.js";
import Question from "../models/questionModel.js";
import { DropDownListItem } from "../types/commonTypes.js";
import {
  IQuestion,
  QueReqWithOptionsModelType,
  QuestionModelType,
} from "../types/modelTypes/questionModelTypes.js";
import { QuestionTypeEnum } from "../utils/enums/commonEnums.js";
import { enumToDropDownList } from "../utils/enums/enumHelper.js";
import Answer from "../models/answerModel.js";

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

  async getQuestionTypes(): Promise<DropDownListItem[]> {
    const list: DropDownListItem[] = enumToDropDownList(QuestionTypeEnum);
    return list;
  },

  async addQuesWithOptions(
    dataObj: QueReqWithOptionsModelType
  ): Promise<boolean> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const newQues: IQuestion[] = await Question.create([dataObj.question], {
        session,
      });

      if (!newQues || newQues.length === 0) {
        throw new Error("Failed to create question");
      }

      if (dataObj.question.questionType === QuestionTypeEnum.Descriptive) {
        await session.commitTransaction();
        await session.endSession();
        return true;
      }

      dataObj.options.forEach((op) => {
        op._id = undefined;
        op.question = newQues[0]._id as string;
        op.createdBy = dataObj.question.createdBy;
        op.updatedBy = dataObj.question.updatedBy;
      });

      const data = await Answer.insertMany(dataObj.options, {
        session,
      });

      await session.commitTransaction();
      await session.endSession();
      return true;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      return false;
    }
  },

  async updateQuesWithOptions(
    id: string,
    dataObj: QueReqWithOptionsModelType
  ): Promise<boolean> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const ques = await Question.findByIdAndUpdate(id, dataObj.question, {
        session,
      });

      if (!ques) {
        throw new Error("Failed to update question");
      }

      // If descriptive, skip options handling
      if (dataObj.question.questionType === QuestionTypeEnum.Descriptive) {
        await Answer.deleteMany({ question: ques._id }, { session }); // Optional: Clean up if previously added options
        await session.commitTransaction();
        await session.endSession();
        return true;
      }

      const incomingOptionsWithId = dataObj.options.filter((op) => !!op._id);
      const incomingIdStringList = incomingOptionsWithId.map((op) =>
        (op._id as string).toString()
      );

      // 1. Find all existing options for the question
      const existingOptions = await Answer.find({ question: ques._id }, null, {
        session,
      });

      const existingOptionIds = existingOptions.map((op) =>
        (op._id as string).toString()
      );

      // 2. Determine which options to delete
      const toDelete = existingOptionIds.filter(
        (id) => !incomingIdStringList.includes(id)
      );

      if (toDelete.length > 0) {
        await Answer.deleteMany({ _id: { $in: toDelete } }, { session });
      }

      // 3. Update existing and insert new options
      for (const op of dataObj.options) {
        if (op._id) {
          await Answer.findByIdAndUpdate(
            op._id,
            {
              ...op,
              updatedBy: ques.updatedBy,
            },
            { session }
          );
        } else {
          await Answer.create(
            [
              {
                ...op,
                question: ques._id,
                createdBy: ques.updatedBy,
                updatedBy: ques.updatedBy,
              },
            ],
            { session }
          );
        }
      }

      await session.commitTransaction();
      await session.endSession();
      return true;
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      return false;
    }
  },
};
