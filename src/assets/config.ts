import axios from "axios";

export const CONFIG = {
  SIGN_IN: "/signin",
  GET_PRODUCTS: "/getproducts",
  CREATE_PRODUCT: "/createproduct",
  UPDATE_PRODUCT: "/updateproduct",
  DELETE_PRODUCT: "/deleteproduct",
  GET_CUSTOMER: "/getcustomers",
  CREATE_CUSTOMER: "/createcustomer",
  UPDATE_CUSTOMER: "/updatecustomer",
  DELETE_CUSTOMER: "/deletecustomer",
  GET_ORDERS: "/getorders",
  CREATE_ORDER: "/createorder",
  SEND_ORDER_EMAIL: "/sendorderpdf",
  GET_PENDING_ORDERS: "/getpendingorders",
  SET_ORDER_APPROVAL: "/setorderapproval",
};

const localURL = "http://localhost:8080";
const prodURL = "https://kamaraj-node-service.onrender.com";

export const httpClient = axios.create({
  baseURL: localURL,
});

export const setAuthHeader = (authToken: string) => {
  if (!httpClient.defaults.headers.common["Authorization"]) {
    httpClient.defaults.headers.common["Authorization"] = authToken;
  }
};

export function formResponseObject(response: any) {
  if (response?.name !== "AxiosError") {
    const resObj = {
      status: response?.status ?? 200,
      message: response?.data?.message ?? "Success",
      value: response?.data?.value ?? null,
    };
    return resObj;
  } else {
    const errorObj = {
      status: response?.response?.status ?? 500,
      message:
        response?.response?.data?.message ??
        response?.message ??
        "Unknown error",
      value: [],
    };
    return errorObj;
  }
}

export const isSuccess = (res: any) => {
  console.log(res);
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};
