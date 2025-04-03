import { Document } from "mongoose";

export type CategoryTypeType = {
  categoryTypeName: string;
};

export type ICategoryType = CategoryTypeType & Document;
