import {
  formResponseObject,
  httpClient,
  setAuthHeader,
  CONFIG as url_config,
} from "../../assets/config";
import { ProductDetails } from "../../assets/interface";

export const getAllProductAPI = async (authToken: string) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .get(url_config.GET_PRODUCTS)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};

export const createProductAPI = async (
  productDetails: ProductDetails,
  authToken: string
) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .post(url_config.CREATE_PRODUCT, productDetails)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};

export const updateProductAPI = async (
  updatedProduct: ProductDetails,
  authToken: string
) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .patch(url_config.UPDATE_PRODUCT, updatedProduct)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};

export const deleteProductAPI = async (
  productId: string,
  authToken: string
) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .delete(url_config.DELETE_PRODUCT + `/${productId}`)
    .then((response) => {
      return formResponseObject(response);
    })
    .catch((err) => {
      return formResponseObject(err);
    });
  return res;
};
