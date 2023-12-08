import axios from "axios";

export const loginUser = async (username: string, password: string) => {
  const res = await axios
    .post("http://localhost:8080/signin", { email: username, password })
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
