import api from "../axios";
import { ApiResType } from "../../types/apiReqResTypes";
import { handleApiRequest } from "../../utils/handleApiRequest";
import { QuestionFormData } from "../../types/masters/questionTypes";

export const getAllQuestions = async (): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get("/masters/question/all");
    return res.data as ApiResType;
  });
};

export const getQuestionById = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get(`/masters/question/${id}`);
    return res.data as ApiResType;
  });
};

export const createQuestion = async (
  formData: QuestionFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.post(`/masters/question/new`, formData);
    return res.data as ApiResType;
  });
};

export const updateQuestion = async (
  id: string,
  formdata: QuestionFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.put(`/masters/question/${id}`, formdata);
    return res.data as ApiResType;
  });
};

export const deleteQuestion = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.delete(`/masters/question/${id}`);
    return res.data as ApiResType;
  });
};

export const getQuestionTypes = async (): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get(`/masters/question/types`);
    return res.data as ApiResType;
  });
};
