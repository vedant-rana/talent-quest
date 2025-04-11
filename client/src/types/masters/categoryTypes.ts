import { CategoryType } from "./categoryTypeTypes";
import { Logo } from "./logoTypes";

export type CategoryFormData = {
  categoryName: string;
  description: string;
  logo: string;
  type: string;
};

export type Category = CategoryFormData & {
  logo: Logo;
  type: CategoryType;
};
