import { IExamRepository } from "../interfaces/IExamRepository.js";
import Exam from "../models/examModel.js";
import { ExamModelType, IExam } from "../types/modelTypes/examModelTypes.js";

export const ExamRepository: IExamRepository = {
  async getAllExams(): Promise<IExam[]> {
    return await Exam.find().populate([
      { path: "logo", select: "name logoUrl" },
      { path: "categoryId", select: "categoryName type" },
    ]);
  },

  async getExamById(id: string): Promise<IExam | null> {
    return await Exam.findById(id).populate([
      { path: "logo", select: "name logoUrl" },
      { path: "categoryId", select: "categoryName type" },
      { path: "createdBy", select: "firstName lastName email" },
      { path: "updatedBy", select: "firstName lastName email" },
    ]);
  },

  async getExamByCustomObj(searchObj: object): Promise<IExam | null> {
    return await Exam.findOne(searchObj);
  },

  async createExam(data: ExamModelType): Promise<IExam | null> {
    return await Exam.create(data);
  },

  async updateExam(id: string, data: ExamModelType): Promise<IExam | null> {
    return Exam.findByIdAndUpdate(id, data, {
      new: true,
    });
  },

  async deleteExam(id: string): Promise<IExam | null> {
    return Exam.findByIdAndDelete(id);
  },
};
