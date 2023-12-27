// store.ts
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import loginReducer from "../features/Auth/AuthSlice";
import customerReducer from "../features/Customer/customerSlice";
import loaderReducer from "../features/Loader/loaderSlice";
import orderReducer from "../features/order/orderSlice"; // Fix the file path casing
import { RESET_STORE } from "./resetAction";

const appReducer = combineReducers({
  product: productReducer,
  login: loginReducer,
  customer: customerReducer,
  loader: loaderReducer,
  order: orderReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
