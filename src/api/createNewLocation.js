import axios from "axios";
import { headers } from "../constants";

export const createNewLocation = (data) => {
  axios
    .put(`https://api.udruga-liberato.hr/web/v1/location`, data, {
      headers,
    })
    .catch((err) => console.error(err));
};
