import axios from "axios";
import Cookies from "js-cookie";

export const getAllLocations = (setLocations) => {
  const token = Cookies.get("_accessToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer jh9240q585hg9gq94gfhq3gweg2458gq34hg8q34ghqg8h3g4hg`,
  };

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
