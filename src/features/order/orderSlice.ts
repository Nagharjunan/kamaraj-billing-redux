import { createSlice } from "@reduxjs/toolkit";
import { OrderDetails } from "../../assets/interface";
import { RootState } from "../../app/store";

export interface OrderState {
  value: OrderDetails[];
}

const initialState: OrderState = {
  value: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getAllOrder: (state, action) => {
      state.value = [...action.payload];
    },
  },
  extraReducers: (builder) => {},
});

export const { getAllOrder } = orderSlice.actions;

export const OrderState = (state: RootState) => state.order;

export default orderSlice.reducer;
