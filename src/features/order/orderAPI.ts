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

export const getPendingOrdersAPI = async (authToken: string) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .get(CONFIG.GET_PENDING_ORDERS)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};

export const approveOrderAPI = async (
  orderId: string,
  authToken: string,
  approvedBy: string
) => {
  setAuthHeader(authToken);
  const approved = {
    orderId,
    approvedBy,
  };
  const res = await httpClient
    .post(CONFIG.SET_ORDER_APPROVAL, approved)
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

export const sendOrderEmailAPI = async (orderId: string, authToken: string) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .get(CONFIG.SEND_ORDER_EMAIL + "/" + orderId)
    .then((response) => {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      return { status: 200 };
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};
