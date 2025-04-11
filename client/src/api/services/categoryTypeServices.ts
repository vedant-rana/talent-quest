import { ApiResType } from "../../types/apiReqResTypes";
import { CategoryTypeFormData } from "../../types/masters/categoryTypeTypes";
import { handleApiRequest } from "../../utils/handleApiRequest";
import api from "../axios";

export const getAllCategoryTypes = async (): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get("/masters/category-type/all");
    return res.data as ApiResType;
  });
};

export const getCatoryTypeById = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get(`/masters/category-type/${id}`);
    return res.data as ApiResType;
  });
};

export const createCategoryType = async (
  formData: CategoryTypeFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.post(`/masters/category-type/new`, formData);
    return res.data as ApiResType;
  });
};

export const updateCategoryType = async (
  id: string,
  formdata: CategoryTypeFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.put(`/masters/category-type/${id}`, formdata);
    return res.data as ApiResType;
  });
};

export const deleteCategoryType = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.delete(`/masters/category-type/${id}`);
    return res.data as ApiResType;
  });
};
