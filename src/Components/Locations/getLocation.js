import axios from "axios";

export const getLocation = (id, setLocation) => {
  const token = "0e3337d3-8d7a-4ffb-bffe-58e6dda65cd3";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

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
