import { ICategoryRepository } from "../interfaces/ICategoryRepository.js";
import Category from "../models/categoryModel.js";
import {
  CategoryModelType,
  ICategory,
} from "../types/modelTypes/categoryModelTypes.js";

export const CategoryRepository: ICategoryRepository = {
  async getAllCategories(): Promise<ICategory[]> {
    return await Category.find().populate([
      { path: "type", select: "categoryTypeName" },
      { path: "logo", select: "name logoUrl" },
    ]);
  },

  async getCategoryById(id: string): Promise<ICategory | null> {
    return await Category.findById(id).populate([
      { path: "type", select: "categoryTypeName" },
      { path: "logo", select: "name logoUrl" },
      { path: "createdBy", select: "firstName lastName email" },
      { path: "updatedBy", select: "firstName lastName email" },
    ]);
  },

  async getCategoryByCustomObj(searchObj: object): Promise<ICategory | null> {
    return await Category.findOne(searchObj);
  },

  async createCategory(category: CategoryModelType): Promise<ICategory | null> {
    return await Category.create(category);
  },

  async updateCategory(
    id: string,
    category: CategoryModelType
  ): Promise<ICategory | null> {
    return Category.findByIdAndUpdate(id, category, {
      new: true,
    });
  },

  async deleteCategory(id: string): Promise<ICategory | null> {
    return Category.findByIdAndDelete(id);
  },
};
