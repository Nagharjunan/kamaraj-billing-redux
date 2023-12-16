import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface loadingState {
  status: "idle" | "loading";
}

const initialState: loadingState = {
  status: "idle",
};

export const loaderSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading";
    },
    closeLoading: (state) => {
      state.status = "idle";
    },
  },
});

export const { setLoading, closeLoading } = loaderSlice.actions;

export const loaderState = (state: RootState) => state.loader;

export default loaderSlice.reducer;
