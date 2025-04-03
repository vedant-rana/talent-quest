import {
  CategoryTypeType,
  ICategoryType,
} from "../types/modelTypes/categoryTypeTypes.js";

export interface ICategoryTypeRepository {
  getAllCategoryTypes(): Promise<ICategoryType[]>;

  getCategoryTypeById(id: string): Promise<ICategoryType | null>;

  getCategoryTypeByCustomObj(searchObj: object): Promise<ICategoryType | null>;

  createCategoryType(category: CategoryTypeType): Promise<ICategoryType | null>;

  updateCategoryType(
    id: string,
    category: CategoryTypeType
  ): Promise<ICategoryType | null>;

  deleteCategoryType(id: string): Promise<ICategoryType | null>;
}
