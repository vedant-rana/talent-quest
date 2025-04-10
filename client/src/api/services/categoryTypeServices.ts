import { ApiResType } from "../../types/apiReqResTypes";
import { CategoryTypeFormData } from "../../types/masters/categoryTypes";
import api from "../axios";

export const getAllCategoryTypes = async (): Promise<ApiResType> => {
  try {
    const res = await api.get("/masters/category-type/all");
    const result = res.data as ApiResType;

    if (!result.success)
      throw new Error(result.message || "Category Type Fetching Failed");

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getCatoryTypeById = async (id: string): Promise<ApiResType> => {
  try {
    const res = await api.get(`/masters/category-type/${id}`);
    const result = res.data as ApiResType;

    if (!result.success)
      throw new Error(result.message || "Category Type Fetching Failed");

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const createCategoryType = async (
  formData: CategoryTypeFormData
): Promise<ApiResType> => {
  try {
    const res = await api.post(`/masters/category-type/new`, formData);
    const result = res.data as ApiResType;

    if (!result.success)
      throw new Error(result.message || "Category Type Creation Failed");

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const updateCategoryType = async (
  id: string,
  formdata: CategoryTypeFormData
): Promise<ApiResType> => {
  try {
    const res = await api.put(`/masters/category-type/${id}`, formdata);
    const result = res.data as ApiResType;

    if (!result.success)
      throw new Error(result.message || "Category Type Update Failed");

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const deleteCategoryType = async (id: string): Promise<ApiResType> => {
  try {
    const res = await api.delete(`/masters/category-type/${id}`);
    const result = res.data as ApiResType;

    if (!result.success)
      throw new Error(result.message || "Category Type Deletion Failed");

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
