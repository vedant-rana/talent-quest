import {
  CategoryModelType,
  ICategory,
} from "../types/modelTypes/categoryModelTypes.js";

export interface ICategoryRepository {
  getAllCategories(): Promise<ICategory[]>;

  getCategoryById(id: string): Promise<ICategory | null>;

  getCategoryByCustomObj(searchObj: object): Promise<ICategory | null>;

  createCategory(category: CategoryModelType): Promise<ICategory | null>;

  updateCategory(
    id: string,
    category: CategoryModelType
  ): Promise<ICategory | null>;

  deleteCategory(id: string): Promise<ICategory | null>;
}
