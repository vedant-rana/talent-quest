export type CategoryTypeFormData = {
  categoryTypeName: string;
};

export type CategoryType = CategoryTypeFormData & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};
