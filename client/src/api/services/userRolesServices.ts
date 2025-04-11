import { ApiResType } from "../../types/apiReqResTypes";
import { UserRoleFormData } from "../../types/masters/userRoleTypes";
import { handleApiRequest } from "../../utils/handleApiRequest";
import api from "../axios";

export const getAllRoles = async (): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get("/masters/user-role/all");
    return res.data as ApiResType;
  });
};

export const getRoleById = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get(`/masters/user-role/${id}`);
    return res.data as ApiResType;
  });
};

export const createRole = async (
  releData: UserRoleFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.post(`/masters/user-role/new`, releData);
    return res.data as ApiResType;
  });
};

export const updateRole = async (
  id: string,
  roleData: UserRoleFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.put(`/masters/user-role/${id}`, roleData);
    return res.data as ApiResType;
  });
};

export const deleteRole = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.delete(`/masters/user-role/${id}`);
    return res.data as ApiResType;
  });
};
