import React from "react";
import logo from "../../assets/images/logo.png";
import "./styles.scss";

const Login = () => {
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
            <form className="theme-form">
              <div className="form-group">
                <label className="col-form-label pt-0">Email</label>
                <input className="form-control" type="email" required />
              </div>
              <div className="form-group">
                <label className="col-form-label">Password</label>
                <input className="form-control" type="password" required />
              </div>
              <div className="form-group form-row mt-3 mb-0">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => alert("clicked")}
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
