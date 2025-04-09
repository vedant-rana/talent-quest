import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./userTypes";
import { loadUser, loginUser, logoutUser } from "./userThunks";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message || "Something went wrong!";
      });

    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message || "Something went wrong!";
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = true;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = true;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export default userSlice.reducer;
