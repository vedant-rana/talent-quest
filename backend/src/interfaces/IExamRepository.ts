import { ExamModelType, IExam } from "../types/modelTypes/examModelTypes.js";

export interface IExamRepository {
  getAllExams(): Promise<IExam[]>;

  getExamById(id: string): Promise<IExam | null>;

  getExamByCustomObj(searchObj: object): Promise<IExam | null>;

  createExam(Exam: ExamModelType): Promise<IExam | null>;

  updateExam(id: string, Exam: ExamModelType): Promise<IExam | null>;

  deleteExam(id: string): Promise<IExam | null>;
}
