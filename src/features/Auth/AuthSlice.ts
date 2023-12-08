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
    setLoading: (state) => {
      state.status = "loading";
    },
    setAuthData: (state, action) => {
      state.value.isLoggedIn = true;
      state.value.username = action.payload.username;
      state.value.id = action.payload.id;
      state.value.role = action.payload.role;
      state.value.email = action.payload.email;
      state.value.accessToken = action.payload.accessToken;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoading, setAuthData } = loginSlice.actions;

export const userData = (state: RootState) => state.login;

export default loginSlice.reducer;
