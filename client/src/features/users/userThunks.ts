import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./userTypes";
import api from "../../api/axios";
import { ApiResType } from "../../types/apiReqResTypes";

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string }
>("user/login", async (loginData) => {
  console.log("in login axios");
  const res = await api.post("/auth/login", loginData);

  var result: ApiResType = res.data as ApiResType;
  console.log("Response login => ", result);
  return result.data as User;
});
