import React, { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import "./styles.scss";
import { initLoginFormData } from "./initLoginFormData";
import axios from "axios";
import { ENDPOINTS } from "../../constants";
import { UserContext } from "../../context/user";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState(initLoginFormData);
  const { setUserInfo, user } = useContext(UserContext);
  const history = useHistory();

  if (user.status) {
    history.push("/dashboard");
  }

  const handleChange = (field) => (e) => {
    e.persist();

    setLoginFormData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(ENDPOINTS.LOGIN, "", {
        headers: {
          username: loginFormData.email,
          password: loginFormData.password,
        },
      })
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.data &&
          res.data.data.attributes.roles.includes("ROLE_ADMIN")
        ) {
          Cookies.set("_id", res.data.data.id);
          Cookies.set("_accessToken", res.data.data.attributes.accessToken);
          Cookies.set("_status", true);
          setUserInfo(res.data.data.attributes, true);
          history.push("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page-login">
      <div className="page-login__form">
        <div className="page-login__logo">
          <img src={logo} alt="" />
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <div className="text-center">
              <h4>Login</h4>
              <h6>Enter your Email and Password</h6>
            </div>
            <form className="theme-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="col-form-label pt-0">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email..."
                  value={loginFormData.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password..."
                  value={loginFormData.password}
                  onChange={handleChange("password")}
                  required
                />
              </div>
              <div className="form-group form-row mt-3 mb-0">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
