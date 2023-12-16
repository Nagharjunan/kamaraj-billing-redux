import { createSlice } from "@reduxjs/toolkit";
import { ProductDetails } from "../../assets/interface";
import { RootState } from "../../app/store";

export interface ProductState {
  value: ProductDetails[];
}

const initialState: ProductState = {
  value: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.value = [...action.payload];
    },
  },
  extraReducers: (builder) => {},
});

export const { getAllProducts } = productSlice.actions;

export const productState = (state: RootState) => state.product;

export default productSlice.reducer;
