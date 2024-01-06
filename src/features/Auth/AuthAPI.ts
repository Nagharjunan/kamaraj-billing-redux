import {
  formResponseObject,
  httpClient,
  CONFIG as url_config,
} from "../../assets/config";

export const loginUser = async (username: string, password: string) => {
  const res = await httpClient
    .post(url_config.SIGN_IN, {
      email: username,
      password,
    })
    .then((response) => {
      console.log(response);
      return formResponseObject(response);
    })
    .catch((err) => {
      console.log(err);
      return formResponseObject(err);
    });
  return res;
};
