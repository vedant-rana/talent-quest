import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./userTypes";
import api from "../../api/axios";
import { ApiResType } from "../../types/apiReqResTypes";
import { LoginFormData } from "../../types/auth/loginTypes";

export const loginUser = createAsyncThunk<User, LoginFormData>(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", loginData);
      var result: ApiResType = res.data as ApiResType;

      if (!result.success) {
        return rejectWithValue(result.message || "Login failed");
      }

      return result.data as User;
    } catch (error: any) {
      console.log("Error in loginUser => ", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const loadUser = createAsyncThunk<User>(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/masters/user/me");

      var result: ApiResType = res.data as ApiResType;

      if (!result.success)
        return rejectWithValue(result.message || "Please Login First");

      return result.data as User;
    } catch (error: any) {
      console.log("Error in loadUser => ", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const logoutUser = createAsyncThunk<User>(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/logout");

      var result: ApiResType = res.data as ApiResType;

      if (!result.success)
        return rejectWithValue(result.message || "Please Try to Log Out again");

      return result.data as User;
    } catch (error: any) {
      console.log("Error in log out User => ", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);
