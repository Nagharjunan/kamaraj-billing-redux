import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { userDetails } from "../../assets/interface";

export interface AuthState {
  value: userDetails;
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
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.value = { ...action.payload };
      state.value.isLoggedIn = true;
    },
    removeAuthData: (state) => {
      state.value = { ...initialState.value };
    },
  },
  extraReducers: (builder) => {},
});

export const { setAuthData, removeAuthData } = loginSlice.actions;

export const userData = (state: RootState) => state.login;

export default loginSlice.reducer;
