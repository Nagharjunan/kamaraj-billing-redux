import axios from "axios";

export const getAllProduct = async () => {
  let config = {
    headers: {
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjQ4NTI4M2IzNDZlYjQ0M2IzMjFkYiIsImlhdCI6MTcwMTg5MTQzMywiZXhwIjoxNzAxOTc3ODMzfQ.qaQNHdzmSXLz7junUtvLiGuIKPv_A9xjuh6AwLM6Zlk",
    },
  };
  const res = await axios
    .get("http://localhost:8080/getproducts", config)
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
