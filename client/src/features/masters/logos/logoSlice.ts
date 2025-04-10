import { createSlice } from "@reduxjs/toolkit";
import { LogoState } from "./logoTypes";
import {
  createLogo,
  deleteLogo,
  loadAllLogos,
  loadLogo,
  updateLogo,
} from "./logosThunk";
import { Logo } from "../../../types/masters/logoTypes";

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
        state.logos.push(action.payload.data as Logo);
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

    builder
      .addCase(updateLogo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logos = state.logos.map((logo) => {
          const logoObj = action.payload.data as Logo;
          if (logo._id === (logoObj._id as string)) {
            return logoObj;
          }
          return logo;
        });
        state.error = null;
      })
      .addCase(updateLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong!";
      });

    builder
      .addCase(deleteLogo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteLogo.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedLogo = action.payload.data as Logo;
        state.logos = state.logos.filter(
          (logo) => logo._id !== deletedLogo._id
        );
        state.error = null;
      })
      .addCase(deleteLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export default logoSlice.reducer;
