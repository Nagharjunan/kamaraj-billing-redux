import {
  setAuthHeader,
  httpClient,
  formResponseObject,
  CONFIG,
} from "../../assets/config";
import { OrderDetails } from "../../assets/interface";

export const getOrdersAPI = async (authToken: string) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .get(CONFIG.GET_ORDERS)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};

export const createOrderAPI = async (
  orderDetails: OrderDetails,
  authToken: string
) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .post(CONFIG.CREATE_ORDER, orderDetails)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};
