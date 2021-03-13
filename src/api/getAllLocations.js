import axios from "axios";
import { headers } from "../constants";

export const getAllLocations = (setLocations) => {
  axios
    .get("https://api.udruga-liberato.hr/web/v1/locations", {
      headers,
    })
    .then((res) => {
      if (res && res.data) {
        setLocations([...res.data.data]);
      }
    })
    .catch((err) => console.error(err));
};
