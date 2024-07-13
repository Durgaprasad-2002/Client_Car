import React, { useState, useEffect } from "react";
import AppLog from "./AppLog";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaUser, FaLock, FaMailBulk } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  let database = [];
  let [stat, setstat] = useState(0);

  // const UpdateStatus = async () => {
  //   const response = await fetch(
  //     "https://bbt-server-1lhz.onrender.com/updatestatus",
  //     {
  //       method: "GET",
  //     }
  //   );
  // };
  // useEffect(() => {
  //   UpdateStatus();
  // }, []);

  const getUser = async () => {
    const response = await fetch(
      "https://bbt-server-1lhz.onrender.com/getlogcred",
      {
        method: "GET",
      }
    );
    database = await response.json();
  };

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginType, setLoginType] = useState("");

  const errors = {
    uname: "Invalid Usermail",
    pass: "Invalid Password",
  };
  let us = false;

  const handleSubmit = async (event) => {
    let sp1 = document.getElementById("sp1");
    let sp2 = document.getElementById("sp2");
    sp1.style.display = "none";
    sp2.style.display = "block";
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    await getUser();
    console.log(database);

    for (let index = 0; index < database.length; index++) {
      let user = database[index];
      if (
        user?.cred === null ||
        user?.cred === undefined ||
        user?.cred === ""
      ) {
        if (user.user === uname.value && user.type === "user") {
          us = true;
          if (user.password === pass.value) {
            setIsSubmitted(true);
            setLoginType(user.type);
            localStorage.setItem("userMail", user.user);
            navigate("/dash", { state: {} });
          } else {
            sp1.style.display = "block";
            sp2.style.display = "none";
            setErrorMessages({ name: "pass", message: errors.pass });
          }
        }
      } else {
        if (user?.cred?.user === uname.value && user?.cred?.type === "user") {
          us = true;
          if (user?.cred?.password === pass.value) {
            setIsSubmitted(true);
            setLoginType(user?.cred?.type);
            localStorage.setItem("userMail", user?.cred?.user);
            navigate("/dash", { state: {} });
          } else {
            sp1.style.display = "block";
            sp2.style.display = "none";
            setErrorMessages({ name: "pass", message: errors.pass });
          }
        }
      }
    }
    if (us == false) {
      sp1.style.display = "block";
      sp2.style.display = "none";
      setErrorMessages({ name: "uname", message: errors.uname });
    }
    us = false;
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <>
      <button
        className="mainbtn"
        href="/Client_Car"
        onClick={() => navigate("/", { state: {} })}
      >
        Home Page
      </button>

      <div id="body">
        <div id="login">
          <form className="login" onSubmit={handleSubmit}>
            <h3 style={{ fontSize: "45px", fontFamily: "revert-layer" }}>
              BBT
            </h3>

            <div className="form-group">
              <label htmlFor="user" style={{ marginLeft: "3px" }}>
                <FaMailBulk />
              </label>
              <input
                placeholder="Email Address"
                type="gamil"
                required
                id="user"
                name="uname"
              />
              {renderErrorMessage("uname")}
            </div>

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
              {renderErrorMessage("pass")}
            </div>

            {/* <button type="submit" className="btn btn-primary " value="Login">
              Login<span className="su"></span>
            </button> */}
            <button type="submit" className="loadbtn">
              <article id="sp1">Login</article>
              <article id="sp2"></article>
            </button>

            <br />
            <br />
            <h6 style={{ textAlign: "center" }}>
              Don't have Account?{"   "}
              <span
                onClick={() => {
                  // window.location.href = "/Client_Car/signup";
                  navigate("/signup", { state: {} });
                  setstat(stat + 1);
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
      {localStorage.getItem("userType") == "user" ? (
        // (window.location.href = "/Client_Car/dash")
        navigate("/dash", { state: {} })
      ) : (
        <div className="app">{renderForm}</div>
      )}
    </>
  );
}

export default Login;
