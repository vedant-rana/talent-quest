import { ICategoryTypeRepository } from "../interfaces/ICategoryTypeRepository.js";
import CategoryType from "../models/categoryTypeModel.js";
import {
  CategoryTypeType,
  ICategoryType,
} from "../types/modelTypes/categoryTypeTypes.js";

export const CategoryTypeRepository: ICategoryTypeRepository = {
  async getAllCategoryTypes(): Promise<ICategoryType[]> {
    return await CategoryType.find();
  },

  async getCategoryTypeById(id: string): Promise<ICategoryType | null> {
    return await CategoryType.findById(id);
  },

  async getCategoryTypeByCustomObj(
    searchObj: object
  ): Promise<ICategoryType | null> {
    return await CategoryType.findOne(searchObj);
  },

  async createCategoryType(
    category: CategoryTypeType
  ): Promise<ICategoryType | null> {
    return await CategoryType.create(category);
  },

  async updateCategoryType(
    id: string,
    category: CategoryTypeType
  ): Promise<ICategoryType | null> {
    return CategoryType.findByIdAndUpdate(id, category, {
      new: true,
    });
  },

  async deleteCategoryType(id: string): Promise<ICategoryType | null> {
    return CategoryType.findByIdAndDelete(id);
  },
};
