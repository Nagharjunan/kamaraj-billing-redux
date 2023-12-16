import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { userDetails } from "../../assets/interface";

export interface AuthState {
  value: userDetails;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  value: {
    isLoggedIn: false,
    username: "",
    id: "",
    role: "",
    email: "",
    accessToken: "",
  },
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.value = { ...action.payload };
      state.value.isLoggedIn = true;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {},
});

export const { setAuthData } = loginSlice.actions;

export const userData = (state: RootState) => state.login;

export default loginSlice.reducer;
