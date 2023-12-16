import {
  httpClient,
  setAuthHeader,
  CONFIG as url_config,
} from "../../assets/config";

export const getAllProduct = async (authToken: string) => {
  setAuthHeader(authToken);
  const res = await httpClient
    .get(url_config.GET_PRODUCTS)
    .then((response) => {
      console.log(response);
      return response.data.value;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return res;
};
