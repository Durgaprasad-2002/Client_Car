import React, { useState, useEffect } from "react";
import AppLog from "./AppLog";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaUser, FaLock, FaMailBulk } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
function LoginOwner() {
  let navigate = useNavigate();

  let [database, setdatabse] = useState([]);
  const getUser = async () => {
    const response = await fetch(
      "https://clean-flip-flops-moth.cyclic.app/getlogcred",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    setdatabse(data);

    for (let index = 0; index < database.length; index++) {
      database[0].type = "admin";
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginType, setLoginType] = useState("");

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    const userData = database.filter((user) => {
      if (user.user === uname.value && user.type == "owner") {
        if (user.password != pass.value) {
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsSubmitted(true);
          setLoginType(user.type);
          localStorage.setItem("userType", user.type);
          // window.location.href = "/Client_Car/LoginOwner";
          navigate("/LoginOwner", { state: {} });
        }
      } else {
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    });
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <>
      <button
        style={{
          float: "right",
          margin: "-50px 5px 0px 0px ",
          outline: "2px solid white",
        }}
        href="/Client_Car"
        className="btn btn-dark"
        onClick={() => navigate("/", { state: {} })}
      >
        Home Page
      </button>
      <div id="body">
        <div id="login">
          <form className="login">
            <img
              src="https://cdn.bigboytoyz.com/new-version/assets/images/bbt-mobile-logo1.png"
              style={{
                width: "140px",
                height: "100px",
                margin: "20px 0px 14px 80px",
              }}
            />
            <div>
              <h5
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  marginBottom: "30px",
                  fontFamily: "serif",
                }}
              >
                Owner's Login
              </h5>
            </div>
            <div className="form-group">
              <label htmlFor="user" style={{ marginLeft: "3px" }}>
                <FaMailBulk />
              </label>
              <input
                placeholder="Email Address"
                type="gmail"
                required
                id="user"
                name="uname"
              />
            </div>
            {renderErrorMessage("uname")}
            <div className="form-group">
              <label htmlFor="password" style={{ marginLeft: "3px" }}>
                <FaLock />
              </label>
              <input
                placeholder="Password"
                type="password"
                required
                id="password"
                name="pass"
              />
            </div>
            {renderErrorMessage("pass")}
            <button
              type="submit"
              className="btn btn-primary"
              value="Login"
              onClick={handleSubmit}
            >
              Login
            </button>

            <br />
            <br />
            <h6 style={{ textAlign: "center" }}>
              Don't have Account?{"   "}
              <span
                onClick={() => {
                  // window.location.href = "/Client_Car/SignUpOwner";
                  navigate("/SignUpOwner", { state: {} });
                }}
                style={{
                  color: "#4d4dff",
                  cursor: "pointer",
                  textDecorationLine: "underline",
                }}
              >
                {" "}
                Sign Up
              </span>
            </h6>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <>
      {localStorage.getItem("userType") == "owner" ? (
        // (window.location.href = "/Client_Car/OwnerDash")
        navigate("/OwnerDash", { state: {} })
      ) : (
        <div className="app">{renderForm}</div>
      )}
    </>
  );
}

export default LoginOwner;
