import { createAsyncThunk } from "@reduxjs/toolkit";
import { Logo } from "../../../types/masters/logoTypes";
import api from "../../../api/axios";
import { ApiResType } from "../../../types/apiReqResTypes";

export const createLogo = createAsyncThunk<Logo, FormData>(
  "logo/new",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/masters/logo/new", formData);
      var result: ApiResType = res.data as ApiResType;

      if (!result.success)
        return rejectWithValue(result.message || "Logo Creation Failed");

      return result.data as Logo;
    } catch (error: any) {
      console.log("Error in logo creation => ", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);
