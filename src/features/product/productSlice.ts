import { createSlice } from "@reduxjs/toolkit";
import { ProductDetails } from "../../assets/interface";
import { RootState } from "../../app/store";

export interface ProductState {
  value: ProductDetails[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  value: [],
  status: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.value = [...action.payload];
      state.status = "idle";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {},
});

export const { getAllProducts, setLoading } = productSlice.actions;

export const productState = (state: RootState) => state.product;

export default productSlice.reducer;
