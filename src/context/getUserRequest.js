import { ENDPOINTS } from "../constants";
import axios from "axios";

export const getUserRequest = (id, accessToken, setUser) => {
  axios
    .get(`${ENDPOINTS.USER}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      if (res.data.data) {
        setUser((prevState) => ({
          ...prevState,
          user: res.data.data.attributes,
        }));
      }
    })
    .catch((err) => console.log(err));
};
