import { Schema, Model, model } from "mongoose";
import { ICategoryType } from "../types/modelTypes/categoryTypeTypes.js";

const CategoryTypeSchema: Schema = new Schema<ICategoryType>(
  {
    categoryTypeName: {
      type: String,
      required: [true, "Category Type Name is required"],
      unique: [true, "Category Type Name must be unique"],
    },
  },
  {
    timestamps: true,
  }
);

const CategoryType: Model<ICategoryType> = model<ICategoryType>(
  "CategoryType",
  CategoryTypeSchema
);

export default CategoryType;
