import api from "../axios";
import { ApiResType } from "../../types/apiReqResTypes";
import { handleApiRequest } from "../../utils/handleApiRequest";
import { AnswerFormData } from "../../types/masters/answerTypes";

export const getAllAnswers = async (): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get("/masters/answer/all");
    return res.data as ApiResType;
  });
};

export const getAnswerById = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.get(`/masters/answer/${id}`);
    return res.data as ApiResType;
  });
};

export const createAnswer = async (
  formData: AnswerFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.post(`/masters/answer/new`, formData);
    return res.data as ApiResType;
  });
};

export const updateAnswer = async (
  id: string,
  formdata: AnswerFormData
): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.put(`/masters/answer/${id}`, formdata);
    return res.data as ApiResType;
  });
};

export const deleteAnswer = async (id: string): Promise<ApiResType> => {
  return await handleApiRequest(async () => {
    const res = await api.delete(`/masters/answer/${id}`);
    return res.data as ApiResType;
  });
};

export const getQuestionsForNonDescriptiveAns =
  async (): Promise<ApiResType> => {
    return await handleApiRequest(async () => {
      const res = await api.get(`/masters/answer/questions`);
      return res.data as ApiResType;
    });
  };
