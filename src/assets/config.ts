import axios from "axios";

export const CONFIG = {
  GET_PRODUCTS: "/getproducts",
  GET_CUSTOMER: "/getcustomers",
  SIGN_IN: "/signin",
};

export const httpClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const setAuthHeader = (authToken: string) => {
  if (!httpClient.defaults.headers.common["Authorization"]) {
    httpClient.defaults.headers.common["Authorization"] = authToken;
  }
};
