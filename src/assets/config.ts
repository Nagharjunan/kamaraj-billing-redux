import axios from "axios";

export const CONFIG = {
  SIGN_IN: "/signin",
  GET_PRODUCTS: "/getproducts",
  GET_CUSTOMER: "/getcustomers",
  CREATE_CUSTOMER: "/createcustomer",
};

export const httpClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const setAuthHeader = (authToken: string) => {
  if (!httpClient.defaults.headers.common["Authorization"]) {
    httpClient.defaults.headers.common["Authorization"] = authToken;
  }
};

export function formResponseObject(response: any) {
  if (response.status) {
    const resObj = {
      status: response.status,
      message: response.data.message,
      value: response.data.value,
    };
    return resObj;
  } else {
    const errorObj = {
      status: response.response.status,
      message: response.response.data.message,
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
