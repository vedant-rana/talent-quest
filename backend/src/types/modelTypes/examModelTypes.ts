import { Schema } from "mongoose";
import { ExamLevelEnum } from "../../utils/enums/commonEnums.js";

export type ExamModelType = {
  name: string;
  description: string;
  level: ExamLevelEnum;
  logo: string | Schema.Types.ObjectId;
  categoryId: string | Schema.Types.ObjectId;
  createdBy: string | Schema.Types.ObjectId;
  updatedBy: string | Schema.Types.ObjectId;
};

export type IExam = ExamModelType & Document;
