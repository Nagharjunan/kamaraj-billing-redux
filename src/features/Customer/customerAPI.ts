import {
  formResponseObject,
  httpClient,
  setAuthHeader,
  CONFIG as url_config,
} from "../../assets/config";
import { CustomerDetails } from "../../assets/interface";

export const getAllCustomerAPI = async (authToken: string) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .get(url_config.GET_CUSTOMER)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};

export const createCustomerAPI = async (
  customerDetails: CustomerDetails,
  authToken: string
) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .post(url_config.CREATE_CUSTOMER, customerDetails)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};

export const updateCustomerAPI = async (
  customerDetails: CustomerDetails,
  authToken: string
) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .put(url_config.UPDATE_CUSTOMER, customerDetails)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};

export const deleteCustomerAPI = async (
  customerId: string,
  authToken: string
) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .delete(url_config.DELETE_CUSTOMER + `/${customerId}`)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};
