import { createAsyncThunk } from "@reduxjs/toolkit";
import { Logo } from "../../../types/masters/logoTypes";
import api from "../../../api/axios";
import { ApiResType } from "../../../types/apiReqResTypes";

export const createLogo = createAsyncThunk<ApiResType, FormData>(
  "logo/new",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/masters/logo/new", formData);
      var result: ApiResType = res.data as ApiResType;

      if (!result.success)
        return rejectWithValue(result.message || "Logo Creation Failed");

      return result;
    } catch (error: any) {
      console.log("Error in logo creation => ", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const loadAllLogos = createAsyncThunk<Logo[]>(
  "logo/all",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/masters/logo/all");
      var result: ApiResType = res.data as ApiResType;

      if (!result.success)
        return rejectWithValue(result.message || "Logo Fetching Failed");

      return result.data as Logo[];
    } catch (error: any) {
      console.log("Error in logo creation => ", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const loadLogo = createAsyncThunk<Logo, string>(
  "logo/single",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/masters/logo/${id}`);
      var result: ApiResType = res.data as ApiResType;

      if (!result.success)
        return rejectWithValue(result.message || "Logo Fetching Failed");

      return result.data as Logo;
    } catch (error: any) {
      console.log("Error in logo creation => ", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const updateLogo = createAsyncThunk<
  ApiResType,
  { id: string; formData: FormData }
>("logo/update", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/masters/logo/${id}`, formData);
    var result: ApiResType = res.data as ApiResType;

    if (!result.success)
      return rejectWithValue(result.message || "Logo Update Failed");

    return result;
  } catch (error: any) {
    console.log("Error in logo update => ", error);
    return rejectWithValue(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
});

export const deleteLogo = createAsyncThunk<ApiResType, string>(
  "logo/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/masters/logo/${id}`);
      var result: ApiResType = res.data as ApiResType;

      if (!result.success)
        return rejectWithValue(result.message || "Logo Deletion Failed");

      return result;
    } catch (error: any) {
      console.log("Error in logo deletion => ", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);
