import axios from "axios";
import { headers } from "../../constants";

export const getLocation = (id, setLocation) => {
  axios
    .get(`https://api.udruga-liberato.hr/web/v1/location/${id}`, {
      headers,
    })
    .then((res) => {
      if (res && res.data) {
        setLocation(res.data.data);
      }
    })
    .catch((err) => console.error(err));
};
