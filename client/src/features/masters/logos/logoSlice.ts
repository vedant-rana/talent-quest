import { createSlice } from "@reduxjs/toolkit";
import { LogoState } from "./logoTypes";
import { createLogo, loadAllLogos, loadLogo } from "./logosThunk";

const initialState: LogoState = {
  logos: [],
  isLoading: false,
  error: null,
};

const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLogo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logos.push(action.payload);
        state.error = null;
      })
      .addCase(createLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong!";
      });

    builder
      .addCase(loadAllLogos.pending, (state) => {
        state.isLoading = true;
        state.logos = [];
        state.error = null;
      })
      .addCase(loadAllLogos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logos = action.payload;
        state.error = null;
      })
      .addCase(loadAllLogos.rejected, (state, action) => {
        state.isLoading = false;
        state.logos = [];
        state.error = action.error.message || "Something went wrong!";
      });

    builder
      .addCase(loadLogo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.logos = state.logos.map((logo) => {
        //   if (logo._id === action.payload._id) {
        //     return action.payload;
        //   }
        //   return logo;
        // });

        state.logos.push(action.payload);
        state.error = null;
      })
      .addCase(loadLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export default logoSlice.reducer;
