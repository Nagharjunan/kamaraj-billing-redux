import axios from "axios";
import { CONFIG as url_config } from "../../assets/config";

export const loginUser = async (username: string, password: string) => {
  const res = await axios
    .post(url_config.BASE_URL + url_config.SIGN_IN, {
      email: username,
      password,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return res;
};
