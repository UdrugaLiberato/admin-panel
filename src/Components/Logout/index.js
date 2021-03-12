import React from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Logout = () => {
  Cookies.remove("_accessToken");
  Cookies.remove("_status");
  const history = useHistory();

  history.push("/");

  return <h1>j</h1>;
};
export default Logout;
