import { createSlice } from "@reduxjs/toolkit";
import { CustomerDetails } from "../../assets/interface";
import { RootState } from "../../app/store";

export interface CustomerState {
  value: CustomerDetails[];
}

const initialState: CustomerState = {
  value: [],
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getAllCustomer: (state, action) => {
      state.value = [...action.payload];
    },
  },
  extraReducers: (builder) => {},
});

export const { getAllCustomer } = customerSlice.actions;

export const customerState = (state: RootState) => state.customer;

export default customerSlice.reducer;
