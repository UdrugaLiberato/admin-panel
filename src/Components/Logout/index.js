import React from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Logout = () => {
  Cookies.set("_status", false);
  const history = useHistory();

  history.push("/");

  return <h1>j</h1>;
};
export default Logout;
