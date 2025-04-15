import api from "../axios";
import { ApiResType } from "../../types/apiReqResTypes";
import { handleApiRequest } from "../../utils/handleApiRequest";
import { ExamFormData } from "../../types/masters/examTypes";

export const getAllExams = async (): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get("/masters/exam/all");
    return res.data as ApiResType;
  });
};

export const getExamById = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get(`/masters/exam/${id}`);
    return res.data as ApiResType;
  });
};

export const createExam = async (
  formData: ExamFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.post(`/masters/exam/new`, formData);
    return res.data as ApiResType;
  });
};

export const updateExam = async (
  id: string,
  formdata: ExamFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.put(`/masters/exam/${id}`, formdata);
    return res.data as ApiResType;
  });
};

export const deleteExam = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.delete(`/masters/exam/${id}`);
    return res.data as ApiResType;
  });
};

export const getExamTypes = async (): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get(`/masters/exam/types`);
    return res.data as ApiResType;
  });
};
