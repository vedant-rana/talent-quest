import { ApiResType } from "../../types/apiReqResTypes";
import { CategoryFormData } from "../../types/masters/categoryTypes";
import { handleApiRequest } from "../../utils/handleApiRequest";
import api from "../axios";

export const getAllCategories = async (): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get("/masters/category/all");
    return res.data as ApiResType;
  });
};

export const getCategoryById = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get(`/masters/category/${id}`);
    return res.data as ApiResType;
  });
};

export const createCategory = async (
  formData: CategoryFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.post(`/masters/category/new`, formData);
    return res.data as ApiResType;
  });
};

export const updateCategory = async (
  id: string,
  formdata: CategoryFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.put(`/masters/category/${id}`, formdata);
    return res.data as ApiResType;
  });
};

export const deleteCategory = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.delete(`/masters/category/${id}`);
    return res.data as ApiResType;
  });
};
