import { Schema } from "mongoose";

export type CategoryModelType = {
  categoryName: string;
  description: string;
  logo: string | Schema.Types.ObjectId;
  type: string | Schema.Types.ObjectId;
  createdBy: string | Schema.Types.ObjectId;
  updatedBy: string | Schema.Types.ObjectId;
};

export type ICategory = CategoryModelType & Document;
