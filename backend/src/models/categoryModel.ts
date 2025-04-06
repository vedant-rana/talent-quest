import { Schema, Model, model } from "mongoose";
import { ICategory } from "../types/modelTypes/categoryModelTypes.js";

const CategorySchema: Schema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: [true, "Category Name is required"],
      unique: [true, "Category Name must be unique"],
    },
    description: {
      type: String,
    },
    logo: {
      type: Schema.Types.ObjectId,
      ref: "Logo",
      required: [true, "Logo is required"],
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "CategoryType",
      required: [true, "Category Type is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Updated by is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Category: Model<ICategory> = model<ICategory>("Category", CategorySchema);

export default Category;
