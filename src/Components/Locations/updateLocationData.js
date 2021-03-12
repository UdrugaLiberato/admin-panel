import axios from "axios";
import { headers } from "../../constants";

export const updateLocationData = (data) => {
  axios
    .put(
      `https://api.udruga-liberato.hr/web/v1/location/${data.data.id}`,
      data,
      {
        headers,
      }
    )
    .catch((err) => console.error(err));
};
